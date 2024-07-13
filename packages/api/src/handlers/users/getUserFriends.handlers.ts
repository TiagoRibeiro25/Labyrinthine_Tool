import { FastifyRequest, FastifyReply } from "fastify";
import constants from "../../constants";
import db from "../../db";
import utils from "../../utils";

/**
 * Retrieves a user's friends.
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A Promise that resolves to void.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	const requestParams = request.params as { userId: string };
	let targetUserId = requestParams.userId;

	const requestQuery = request.query as { page?: string; limit?: string };
	const page = requestQuery.page ? parseInt(requestQuery.page) : 1;
	const limit = requestQuery.limit ? parseInt(requestQuery.limit) : 10;

	if (targetUserId === "me") {
		targetUserId = request.headers["userId"] as string;
	}

	// Check if the user exists
	const user = await db.main.user.findUnique({
		where: { id: targetUserId },
		select: { id: true },
	});

	if (!user) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusNotFound,
			message: "User not found",
		});

		return;
	}

	// Fetch the friends
	const friendships = await db.main.friendRequest.findMany({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			AND: [
				{
					OR: [{ senderId: targetUserId }, { receiverId: targetUserId }],
				},
				{ status: "accepted" },
			],
		},
		select: {
			id: true,
			senderId: true,
			receiverId: true,
			updatedAt: true, // Friends since
			receiver: {
				select: { id: true, username: true, profilePictureId: true },
			},
			sender: {
				select: { id: true, username: true, profilePictureId: true },
			},
		},
	});

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusOK,
		message: "Friends retrieved successfully",
		data: {
			friends: friendships.map((friendship) => {
				const friend =
					friendship.senderId === targetUserId ? friendship.receiver : friendship.sender;

				return {
					id: friend.id,
					username: friend.username,
					profilePictureId: friend.profilePictureId,
					friends_since: friendship.updatedAt,
				};
			}),
		},
	});
};
