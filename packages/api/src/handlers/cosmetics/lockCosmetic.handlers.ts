import { FastifyRequest, FastifyReply } from "fastify";
import constants from "../../constants";
import db from "../../db";
import utils from "../../utils";

/**
 * Locks a cosmetic for a specific user.
 * @param request - The Fastify request object
 * @param reply - The Fastify reply object
 * @returns A Promise that resolves to void
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	const requestParams = request.params as { cosmeticId: string };
	const loggedUserId = request.headers["userId"] as string;

	// Check if the user has the cosmetic (no need to check if the cosmetic exists)
	const userCosmetic = await db.main.userCosmetic.findFirst({
		where: {
			userId: loggedUserId,
			cosmeticId: requestParams.cosmeticId,
		},
		select: { id: true },
	});

	if (!userCosmetic) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusNotFound,
			message: "The user doesn't have this cosmetic",
		});

		return;
	}

	// Lock the cosmetic for the user
	await db.main.userCosmetic.delete({
		where: { id: userCosmetic.id },
	});

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusOK,
		message: "Cosmetic removed from user's inventory",
	});
};
