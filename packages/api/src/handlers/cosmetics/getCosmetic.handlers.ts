import { FastifyRequest, FastifyReply } from "fastify";
import constants from "../../constants";
import { request } from "http";
import db from "../../db";
import utils from "../../utils";

/**
 * Retrieves a specific cosmetic by its ID.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
};
