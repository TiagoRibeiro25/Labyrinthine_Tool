// PRE-VALIDATION

import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import utils from "../utils";

//! REQUIRES handleAuthToken.hooks.ts TO RUN BEFORE THIS HOOK

export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	try {
		const userId = request.headers["userId"] as string;
		let isUserAdmin: boolean = false;

		const cachedUser = await db.adminListRedisInstance.get(userId);

		if (cachedUser) {
			isUserAdmin = cachedUser === "true";
		} else {
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
