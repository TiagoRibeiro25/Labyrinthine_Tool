import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import services from "../services";
import utils from "../utils";

/**
 * Handler functions for user-related operations.
 */
export default {
	/**
	 * Retrieves a user's information.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 * @returns A Promise that resolves to void.
	 */
	getUser: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		const requestParams = request.params as { userId: string };
		const loggedUserId = request.headers["userId"] as string;
		let userId = requestParams.userId;

		// If the userId is "me", get the user id from the request (added by the auth hook)
		if (userId === "me") {
			userId = loggedUserId;
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
					where: { receiverId: userId },
					select: { senderId: true, status: true },
				},
				sentRequests: {
					where: { senderId: userId },
					select: { receiverId: true, status: true },
				},
			},
		});

		if (!user) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusNotFound,
				message: "User not found",
			});
			return;
		}

		// Variable used to store the friendship status between the logged user and the requested user
		let friendRequestStatus = "none";

		// Check for friend requests
		for (const request of user.receivedRequests) {
			if (request.senderId === loggedUserId) {
				friendRequestStatus =
					request.status === "pending" ? "waiting for the other user to accept" : "accepted";
				break;
			}
		}

		// If the loop above found a friend request, there's no point in checking for more
		if (friendRequestStatus !== "none") {
			for (const request of user.sentRequests) {
				if (request.receiverId === loggedUserId) {
					friendRequestStatus =
						request.status === "pending"
							? "the other user is waiting for you to accept"
							: "accepted";
					break;
				}
			}
		}

		const totalFriends =
			user.receivedRequests.map((request) => request.status === "accepted").length +
			user.sentRequests.map((request) => request.status === "accepted").length;

		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusOK,
			message: "User retrieved successfully",
			data: {
				user: {
					id: user.id,
					username: user.username,
					discordUsername: user.discordUsername,
					steamProfileUrl: user.steamProfileUrl,
					cosmetics: user.userCosmetics.map((cosmetic) => cosmetic.cosmeticId),
					totalFriends,
					friendRequestStatus,
					isLoggedUser: userId === loggedUserId,
					createdAt: user.createdAt,
				},
			},
		});
	},

	/**
	 * Sends a friend request to a user.
	 * It can also accept a friend request if the other user has already sent one to the user who sent the request.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 * @returns A Promise that resolves to void.
	 */
	sendFriendRequest: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
					statusCode: constants.HTTP.StatusOK,
					message: "Friend request accepted",
				});

				// Log the event
				await services.logger.log({
					type: "info",
					message: `The user ${senderId} (IP: ${request.ip}) accepted the friend request from the user ${receiverId}`,
				});
			} else {
				// Else (if the status is "accepted") then both users are already friends
				utils.response.send({
					reply,
					statusCode: constants.HTTP.StatusForbidden,
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
			statusCode: constants.HTTP.StatusOK,
			message: "Friend request sent successfully",
			data: { friendRequest },
		});
	},
};
