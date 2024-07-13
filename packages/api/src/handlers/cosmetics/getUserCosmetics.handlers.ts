import { FastifyRequest, FastifyReply } from "fastify";
import constants from "../../constants";
import db from "../../db";
import utils from "../../utils";

/**
 * Retrieves all cosmetics for a specific user.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	const requestQuery = request.query as {
		userId: string;
		filter?: "unlocked" | "locked";
	};
	const loggedUserId = request.headers["userId"] as string;
	const targetId = requestQuery.userId === "me" ? loggedUserId : requestQuery.userId;
	const filter = requestQuery.filter || "unlocked";

	// Fetch all the cosmetics for the user has unlocked
	const unlockedCosmetics = await db.main.userCosmetic.findMany({
		where: { userId: targetId },
		select: { cosmetic: true },
	});

	let cosmetics = unlockedCosmetics.map((userCosmetic) => userCosmetic.cosmetic);

	if (filter === "locked") {
		const unlockedCosmeticsIds = cosmetics.map((cosmetic) => cosmetic.id);

		// Get all the cosmetics the user hasn't unlocked
		cosmetics = await db.main.cosmetic.findMany({
			where: {
				id: { notIn: unlockedCosmeticsIds },
			},
		});
	}

	if (!cosmetics || cosmetics.length === 0) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusNotFound,
			message: "No cosmetics found",
		});

		return;
	}

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusOK,
		message: "Cosmetics found",
		data: cosmetics,
	});
};
