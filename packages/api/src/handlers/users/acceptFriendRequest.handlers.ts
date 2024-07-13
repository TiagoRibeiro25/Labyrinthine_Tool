import { FastifyRequest, FastifyReply } from "fastify";
import db from "../../db";
import services from "../../services";
import utils from "../../utils";
import constants from "../../constants";

/**
 * Accepts a friend request to a user.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	const requestParams = request.params as { userId: string };
	const senderId = request.headers["userId"] as string;
	const receiverId = requestParams.userId;

	if (receiverId === senderId) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusForbidden,
			message: "Invalid user ids",
		});

		return;
	}

	// Find the friendship between the two users
	const friendship = await db.main.friendRequest.findFirst({
		where: { senderId: senderId, receiverId: receiverId },
		select: { id: true, status: true },
	});

	// Check if the friend request exists
	if (!friendship) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusNotFound,
			message: "Friend request not found",
		});

		return;
	}

	// Check if both users are already friends
	if (friendship.status === "accepted") {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusForbidden,
			message: "You are already friends with this user",
		});

		return;
	}

	// Accept the friend request
	await db.main.friendRequest.update({
		where: { id: friendship.id },
		data: { status: "accepted" },
	});

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusOK,
		message: "Friend request accepted",
	});

	// Log the event
	await services.logger.log({
		type: "info",
		message: `The user ${senderId} (IP: ${request.ip}) accepted the friend request from the user ${receiverId}`,
	});
};
