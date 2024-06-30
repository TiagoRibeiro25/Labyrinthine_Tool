// PRE-VALIDATION

import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import utils from "../utils";

//! REQUIRES handleAuthToken.hooks.ts TO RUN BEFORE THIS HOOK

/**
 * Handles the validation for admin users.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A promise that resolves to void.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	try {
		const userId = request.headers["userId"] as string;
		let isUserAdmin: boolean = false;

		// Check if there's already a cached value for the user's admin status
		const cachedUser = await db.adminListRedisInstance.get(userId);

		if (cachedUser) {
			isUserAdmin = cachedUser === "true";
		} else {
			// If there's no cached value, fetch the user's admin status from the database
			const user = await db.main.user.findUnique({
				where: { id: userId },
				select: { isAdministrator: true },
			});

			if (!user) {
				throw new Error(
					"User not found - handleAdminValidation.hooks.ts (this should never happen"
				);
			}

			isUserAdmin = user.isAdministrator;
		}

		// Cache the user's admin status for a day
		await db.adminListRedisInstance.set(
			userId,
			isUserAdmin.toString(),
			"EX",
			constants.TIME.ONE_DAY_IN_SECONDS
		);

		if (!isUserAdmin) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusForbidden,
				message: "You are not an administrator",
			});
		}

		return;
	} catch (error) {
		utils.response.handleInternalError(reply, error);
	}
};
