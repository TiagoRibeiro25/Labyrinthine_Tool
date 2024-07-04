// PRE-VALIDATION

import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import utils from "../utils";

/**
 * Handles the validation for admin users.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A promise that resolves to void.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	const userId = request.headers["userId"] as string | undefined;
	let isUserAdmin: boolean = false;

	if (!userId) {
		throw new Error(
			"handleAuthToken.hooks.ts didn't run before handleAdminValidation.hooks.ts"
		);
	}

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
		return;
	}

	return;
};
