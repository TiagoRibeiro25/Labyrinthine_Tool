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
				profilePictureId: true,
				discordUsername: true,
				steamProfileUrl: true,
				createdAt: true,
				userCosmetics: {
					where: { userId: userId },
					select: {
						cosmetic: {
							select: {
								id: true,
								name: true,
								pictureId: true,
							},
						},
					},
				},
				receivedRequests: {
					where: { receiverId: userId },
					select: {
						senderId: true,
						status: true,
						sender: {
							select: {
								username: true,
								profilePictureId: true,
							},
						},
					},
				},
				sentRequests: {
					where: { senderId: userId },
					select: {
						receiverId: true,
						status: true,
						receiver: {
							select: {
								username: true,
								profilePictureId: true,
							},
						},
					},
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
					request.status === "pending" ? "waiting for the other user to accept" : "friends";
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
							: "friends";
					break;
				}
			}
		}

		// Fetch total amount of cosmetics that exist in the game
		const totalCosmetics = await db.main.cosmetic.count();

		const receivedRequests = user.receivedRequests.map((request) => {
			return {
				id: request.senderId,
				username: request.sender.username,
				profilePictureId: request.sender.profilePictureId,
			};
		});

		const sentRequests = user.sentRequests.map((request) => {
			return {
				id: request.receiverId,
				username: request.receiver.username,
				profilePictureId: request.receiver.profilePictureId,
			};
		});

		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusOK,
			message: "User retrieved successfully",
			data: {
				user: {
					id: user.id,
					username: user.username,
					discordUsername: user.discordUsername,
					profilePictureId: user.profilePictureId,
					steamProfileUrl: user.steamProfileUrl,
					unlockedCosmetics: user.userCosmetics.length,
					someUnlockedCosmetics: user.userCosmetics
						.map((userCosmetic) => userCosmetic.cosmetic)
						.slice(0, 10),
					totalCosmetics,
					// Show the first 10 friends
					someFriends:
						receivedRequests.length >= 10
							? receivedRequests
							: [...receivedRequests, ...sentRequests.slice(0, 10 - receivedRequests.length)],
					totalFriends: receivedRequests.length + sentRequests.length,
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

	/**
	 * Removes a friend from the friend list.
	 * @param {FastifyRequest} request - The Fastify request object.
	 * @param {FastifyReply} reply - The Fastify reply object.
	 * @returns {Promise<void>} A Promise that resolves to void.
	 */
	removeFriend: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		const requestParams = request.params as { userId: string };
		const loggedUserId = request.headers["userId"] as string;
		const targetUserId = requestParams.userId; // The id of the user to remove from the friend list

		// Check if the user is trying to remove himself from the friend list
		if (loggedUserId === loggedUserId) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusForbidden,
				message: "You can't remove yourself from the friend list",
			});

			return;
		}

		// Check if the user is friends with the receiver
		const friendship = await db.main.friendRequest.findFirst({
			where: {
				AND: [
					{
						OR: [
							{ senderId: loggedUserId, receiverId: targetUserId },
							{ senderId: targetUserId, receiverId: loggedUserId },
						],
					},
					{ status: "accepted" },
				],
			},
			select: { id: true },
		});

		if (!friendship) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusForbidden,
				message: "Friend Relationship not found",
			});

			return;
		}

		// Delete the friendship
		await db.main.friendRequest.delete({
			where: { id: friendship.id },
		});

		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusOK,
			message: "Friend removed successfully",
		});

		// Log the event
		await services.logger.log({
			type: "info",
			message: `The user ${loggedUserId} (IP: ${request.ip}) removed the user ${targetUserId} from the friend list`,
		});
	},

	/**
	 * Retrieves a user's friends.
	 * @param {FastifyRequest} request - The Fastify request object.
	 * @param {FastifyReply} reply - The Fastify reply object.
	 * @returns {Promise<void>} A Promise that resolves to void.
	 */
	getUserFriends: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
	},
};
