import constants from "../../constants";
import { FastifyRequest, FastifyReply } from "fastify";
import db from "../../db";
import services from "../../services";
import utils from "../../utils";

/**
 * Handles the removal of a cosmetic.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
	const cosmetic = await db.main.cosmetic.delete({
		where: { id: requestParams.cosmeticId },
	});

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusOK,
		message: "Cosmetic removed successfully.",
	});

	// Log the event to the logger service
	await services.logger.log({
		type: "info",
		message: "Cosmetic removed successfully.",
		data: cosmetic,
	});
};
