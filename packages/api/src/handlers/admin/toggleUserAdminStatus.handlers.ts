import { FastifyRequest, FastifyReply } from "fastify";
import constants from "../../constants";
import db from "../../db";
import services from "../../services";
import utils from "../../utils";

/**
 * Handles the toggling of a user's admin status.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	const requestParams = request.params as { userId: string };
	const loggedUserId = request.headers.userId as string;

	// Check if the user exists
	const user = await db.main.user.findFirst({
		where: { id: requestParams.userId },
		select: { id: true, isAdministrator: true },
	});

	if (!user) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusNotFound,
			message: "User not found.",
		});

		return;
	}

	// Update the user to be the opposite of what they currently are (admin or not)
	const updatedUser = await db.main.user.update({
		where: { id: user.id },
		data: { isAdministrator: !user.isAdministrator },
		select: {
			id: true,
			username: true,
			isAdministrator: true,
			updatedAt: true,
			createdAt: true,
		},
	});

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusOK,
		message: "User admin status updated successfully.",
		data: updatedUser,
	});

	// Update the cached value for the user's admin status
	await db.adminListRedisInstance.set(
		user.id,
		updatedUser.isAdministrator.toString(),
		"EX",
		constants.TIME.ONE_DAY_IN_SECONDS
	);

	// Log the event to the logger service
	await services.logger.log({
		type: "info",
		message: `The admin ${loggedUserId} (IP: ${request.ip}) updated the admin status of the user ${user.id}.`,
		data: updatedUser,
	});
};
