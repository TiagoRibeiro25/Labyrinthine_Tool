import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import services from "../services";
import utils from "../utils";

type AddCosmeticBody = {
	name: string;
	type: string;
	source: string;
	image_url: string;
	icon_url: string;
	notes?: string;
};

export default {
	/**
	 * Handles the addition of a cosmetic.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 */
	addCosmetic: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		const { name, type, source, image_url, icon_url, notes } = request.body as AddCosmeticBody;

		// Check if there's already a cosmetic with the same name
		const doesCosmeticAlreadyExist = await db.main.cosmetic.findFirst({
			where: {
				name: {
					equals: name,
					mode: "insensitive",
				},
			},
			select: { id: true },
		});

		if (doesCosmeticAlreadyExist) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusBadRequest,
				message: "There's already a cosmetic with the same name.",
			});
			return;
		}

		// Add the cosmetic to the database
		const cosmetic = await db.main.cosmetic.create({
			data: {
				name,
				type,
				source,
				inGamePictureUrl: image_url,
				iconUrl: icon_url,
				notes,
			},
		});

		if (!cosmetic) {
			// Log the error to the logger service
			await services.logger.log({
				type: "error",
				message: "Failed to add the cosmetic.",
				data: { name, type, source, image_url, icon_url },
			});

			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusBadRequest,
				message: "Failed to add the cosmetic.",
			});
			return;
		}

		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusCreated,
			message: "Cosmetic added successfully.",
			data: cosmetic,
		});
	},

	/**
	 * Handles the removal of a cosmetic.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 */
	deleteCosmetic: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		// TODO: Internal Server Error

		const requestParams = request.params as { cosmeticId: string };

		// Check if the cosmetic exists
		const doesCosmeticExist = await db.main.cosmetic.findFirst({
			where: { id: requestParams.cosmeticId },
			select: { id: true },
		});

		if (!doesCosmeticExist) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusNotFound,
				message: "Cosmetic not found.",
			});
			return;
		}

		// Remove the cosmetic from the database

		// const [cosmetic, _userCosmetics] = await db.main.$transaction([
		// 	db.main.cosmetic.delete({
		// 		where: { id: requestParams.cosmeticId },
		// 	}),
		// 	db.main.userCosmetic.deleteMany({
		// 		where: { cosmeticId: requestParams.cosmeticId },
		// 	}),
		// ]);

		const cosmetic = await db.main.cosmetic.delete({
			where: { id: requestParams.cosmeticId },
			include: { userCosmetics: true },
		});

		// Log the event to the logger service
		await services.logger.log({
			type: "info",
			message: "Cosmetic removed successfully.",
			data: cosmetic,
		});

		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusOK,
			message: "Cosmetic removed successfully.",
		});
	},
};
