import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import utils from "../utils";

/**
 * Retrieves a specific cosmetic by its ID.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export default {
	getCosmetic: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		const requestParams = request.params as { cosmeticId: string };

		const cosmetic = await db.main.cosmetic.findUnique({
			where: {
				id: requestParams.cosmeticId,
			},
		});

		if (!cosmetic) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusNotFound,
				message: "Cosmetic not found",
			});

			return;
		}

		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusOK,
			message: "Cosmetic found",
			data: cosmetic,
		});
	},

	/**
	 * Retrieves all cosmetics for a specific user.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 * @returns A Promise that resolves to void.
	 */
	getUserCosmetics: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
	},

	/**
	 * Unlocks a cosmetic for a specific user.
	 * @param request - Fastify request object
	 * @param reply - Fastify reply object
	 * @returns A Promise that resolves to void
	 */
	unlockCosmetic: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
	},

	/**
	 * Locks a cosmetic for a specific user.
	 * @param request - The Fastify request object
	 * @param reply - The Fastify reply object
	 * @returns A Promise that resolves to void
	 */
	lockCosmetic: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
	},
};
