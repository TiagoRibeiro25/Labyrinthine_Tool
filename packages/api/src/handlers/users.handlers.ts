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

			// TODO: Check if the user id is a valid uuid (with regex)

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
						createdAt: user.createdAt,
						cosmetics: user.userCosmetics,
						totalFriends: user.receivedRequests.length + user.sentRequests.length,
					},
				},
			});
		} catch (error) {
			utils.response.handleInternalError(reply, error);
		}
	},
};
