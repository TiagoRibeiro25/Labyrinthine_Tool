import { FastifyRequest, FastifyReply } from "fastify";
import constants from "../../constants";
import db from "../../db";
import utils from "../../utils";

/**
 * Unlocks a cosmetic for a specific user.
 * @param request - Fastify request object
 * @param reply - Fastify reply object
 * @returns A Promise that resolves to void
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	const requestParams = request.params as { cosmeticId: string };
	const loggedUserId = request.headers["userId"] as string;

	// Check if the cosmetic exists
	const cosmetic = await db.main.cosmetic.findUnique({
		where: { id: requestParams.cosmeticId },
		select: { id: true },
	});

	if (!cosmetic) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusNotFound,
			message: "Cosmetic not found",
		});

		return;
	}

	// Check if the user already has the cosmetic
	const userCosmetic = await db.main.userCosmetic.findFirst({
		where: {
			userId: loggedUserId,
			cosmeticId: requestParams.cosmeticId,
		},
		select: { id: true },
	});

	if (userCosmetic) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusBadRequest,
			message: "User already has this cosmetic",
		});

		return;
	}

	// Unlock the cosmetic for the user
	await db.main.userCosmetic.create({
		data: {
			userId: loggedUserId,
			cosmeticId: requestParams.cosmeticId,
		},
	});

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusOK,
		message: "Cosmetic unlocked",
	});
};
