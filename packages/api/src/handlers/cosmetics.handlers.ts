import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import utils from "../utils";

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
};
