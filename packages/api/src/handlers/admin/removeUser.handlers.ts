import { FastifyRequest, FastifyReply } from "fastify";
import { request } from "http";
import db from "../../db";
import services from "../../services";
import utils from "../../utils";
import constants from "../../constants";

/**
 * Handles the removal of a user.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	const requestParams = request.params as { userId: string };
	const loggedUserId = request.headers.userId as string;

	const user = await db.main.user.findFirst({
		where: { id: requestParams.userId },
		select: { id: true, isAdministrator: true },
	});

	// Check if the user exists
	if (!user) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusNotFound,
			message: "User not found.",
		});

		return;
	}

	// Check if the user is an admin
	if (user.isAdministrator) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusForbidden,
			message: "You cannot remove an admin user.",
		});

		await services.logger.log({
			type: "error",
			message: `The admin ${loggedUserId} (IP: ${request.ip}) tried to remove the admin user ${user.id}.`,
			data: { userId: user.id, loggedUserId },
		});

		return;
	}

	// Remove the user from the database
	await db.main.user.delete({
		where: { id: user.id },
	});

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusOK,
		message: "User removed successfully.",
	});
};
