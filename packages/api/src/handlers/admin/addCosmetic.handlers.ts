import { FastifyRequest, FastifyReply } from "fastify";
import constants from "../../constants";
import db from "../../db";
import services from "../../services";
import utils from "../../utils";

type AddCosmeticBody = {
	name: string;
	type: string;
	source: string;
	image_url: string;
	icon_url: string;
	notes?: string;
	pictureId?: string;
};

/**
 * Handles the addition of a cosmetic.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	const { name, type, source, image_url, icon_url, notes, pictureId } =
		request.body as AddCosmeticBody;

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
			notes,
			pictureId,
		},
	});

	if (!cosmetic) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusBadRequest,
			message: "Failed to add the cosmetic.",
		});

		// Log the error to the logger service
		await services.logger.log({
			type: "error",
			message: "Failed to add the cosmetic.",
			data: { name, type, source, image_url, icon_url },
		});

		return;
	}

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusCreated,
		message: "Cosmetic added successfully.",
		data: cosmetic,
	});
};
