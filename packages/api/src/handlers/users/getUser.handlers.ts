import { FastifyRequest, FastifyReply } from "fastify";
import db from "../../db";
import utils from "../../utils";
import constants from "../../constants";
/**
 * Retrieves a user's information.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
					request.status === "pending" ? "the other user is waiting for you to accept" : "friends";
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
};
