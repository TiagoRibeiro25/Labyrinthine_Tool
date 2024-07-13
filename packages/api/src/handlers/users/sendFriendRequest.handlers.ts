import { FastifyRequest, FastifyReply } from "fastify";
import db from "../../db";
import services from "../../services";
import utils from "../../utils";
import constants from "../../constants";

/**
 * Sends a friend request to a user.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	const requestParams = request.params as { userId: string };
	const senderId = request.headers["userId"] as string;
	const receiverId = requestParams.userId;

	// Check if the user is trying to send a friend request to himself
	if (receiverId === senderId) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusForbidden,
			message: "You can't send a friend request to yourself",
		});

		return;
	}

	// Check if the receiver exists
	const doesReceiverExist = await db.main.user.findUnique({
		where: { id: receiverId },
		select: { id: true },
	});

	if (!doesReceiverExist) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusNotFound,
			message: "User not found",
		});

		return;
	}

	// Check if the user has already sent a friend request to this user, if so don't do anything
	const didUserSendRequestAlready = await db.main.friendRequest.findFirst({
		where: { senderId, receiverId },
		select: { id: true, status: true },
	});

	if (didUserSendRequestAlready) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusForbidden,
			message:
				didUserSendRequestAlready.status === "pending"
					? "You have already sent a friend request to this user"
					: "You are already friends with this user",
		});

		return;
	}

	// Check if the other user has already sent a friend request to the user who sent the request
	const didOtherUserSendRequest = await db.main.friendRequest.findFirst({
		where: { senderId: receiverId, receiverId: senderId },
		select: { id: true, status: true },
	});

	if (didOtherUserSendRequest) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusForbidden,
			message:
				didOtherUserSendRequest.status === "pending"
					? "You have a pending friend request from this user"
					: "You are already friends with this user",
		});

		return;
	}

	// Create the friend request
	const friendRequest = await db.main.friendRequest.create({
		data: {
			senderId,
			receiverId,
			status: "pending",
		},
	});

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusOK,
		message: "Friend request sent successfully",
		data: { friendRequest },
	});
};
