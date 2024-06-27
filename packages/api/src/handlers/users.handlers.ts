import { FastifyReply, FastifyRequest } from "fastify";
import db from "../db";
import utils from "../utils";

export default {
	getUser: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		try {
			const requestParams = request.params as { userId: string };
			let userId = requestParams.userId;

			// If the userId is "me", get the user id from from the request (added by the auth hook)
			if (userId === "me") {
				userId = request.headers["userId"] as string;
			}

			// Fetch the user from the database
			const user = await db.main.user.findUnique({
				where: { id: userId },
				select: {
					id: true,
					username: true,
					discordUsername: true,
					steamProfileUrl: true,
					createdAt: true,
					userCosmetics: {
						where: { userId: userId },
						select: { cosmeticId: true },
					},
					receivedRequests: {
						where: {
							receiverId: userId,
							status: "accepted",
						},
					},
					sentRequests: {
						where: {
							senderId: userId,
							status: "accepted",
						},
					},
				},
			});

			if (!user) {
				utils.response.send({
					reply,
					statusCode: utils.http.StatusNotFound,
					message: "User not found",
				});
				return;
			}

			// TODO: Add information about friend relationship status

			utils.response.send({
				reply,
				statusCode: utils.http.StatusOK,
				message: "User retrieved successfully",
				data: {
					user: {
						id: user.id,
						username: user.username,
						discordUsername: user.discordUsername,
						steamProfileUrl: user.steamProfileUrl,
						cosmetics: user.userCosmetics,
						totalFriends: user.receivedRequests.length + user.sentRequests.length,
						createdAt: user.createdAt,
					},
				},
			});
		} catch (error) {
			utils.response.handleInternalError(reply, error);
		}
	},

	sendFriendRequest: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		try {
			const requestParams = request.params as { userId: string };
			const senderId = request.headers["userId"] as string;
			const receiverId = requestParams.userId;

			// Check if the user is trying to send a friend request to himself
			if (receiverId === senderId) {
				utils.response.send({
					reply,
					statusCode: utils.http.StatusForbidden,
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
					statusCode: utils.http.StatusNotFound,
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
					statusCode: utils.http.StatusForbidden,
					message:
						didUserSendRequestAlready.status === "pending"
							? "You have already sent a friend request to this user"
							: "You are already friends with this user",
				});
				return;
			}

			// Check if the other user has already sent a friend request to the user who sent the request
			const didOtherUserSendRequestAlready = await db.main.friendRequest.findFirst({
				where: { senderId: receiverId, receiverId: senderId },
				select: { id: true, status: true },
			});

			if (didOtherUserSendRequestAlready) {
				// Check if the status is "pending"
				if (didOtherUserSendRequestAlready.status === "pending") {
					// If so, accept the friend request
					await db.main.friendRequest.update({
						where: { id: didOtherUserSendRequestAlready.id },
						data: { status: "accepted" },
					});

					utils.response.send({
						reply,
						statusCode: utils.http.StatusOK,
						message: "Friend request accepted",
					});
				} else {
					// Else (if the status is "accepted") then both users are already friends
					utils.response.send({
						reply,
						statusCode: utils.http.StatusForbidden,
						message: "You are already friends with this user",
					});
				}

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
				statusCode: utils.http.StatusOK,
				message: "Friend request sent successfully",
				data: { friendRequest },
			});
		} catch (error) {
			utils.response.handleInternalError(reply, error);
		}
	},
};
