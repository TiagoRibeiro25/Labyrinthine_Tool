import { FastifyRequest, FastifyReply } from "fastify";
import constants from "../../constants";
import db from "../../db";
import services from "../../services";
import utils from "../../utils";
/**
 * Removes a friend from the friend list.
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A Promise that resolves to void.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
};
