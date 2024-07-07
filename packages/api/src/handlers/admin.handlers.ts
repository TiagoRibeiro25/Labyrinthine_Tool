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
	},

	/**
	 * Handles the removal of a cosmetic.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 */
	deleteCosmetic: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
	},

	/**
	 * Handles the toggling of a user's admin status.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 */
	toggleUserAdminStatus: async (
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> => {
		const requestParams = request.params as { userId: string };
		const loggedUserId = request.headers.userId as string;

		// Check if the user exists
		const user = await db.main.user.findFirst({
			where: { id: requestParams.userId },
			select: { id: true, isAdministrator: true },
		});

		if (!user) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusNotFound,
				message: "User not found.",
			});

			return;
		}

		// Update the user to be the opposite of what they currently are (admin or not)
		const updatedUser = await db.main.user.update({
			where: { id: user.id },
			data: { isAdministrator: !user.isAdministrator },
			select: {
				id: true,
				username: true,
				isAdministrator: true,
				updatedAt: true,
				createdAt: true,
			},
		});

		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusOK,
			message: "User admin status updated successfully.",
			data: updatedUser,
		});

		// Update the cached value for the user's admin status
		await db.adminListRedisInstance.set(
			user.id,
			updatedUser.isAdministrator.toString(),
			"EX",
			constants.TIME.ONE_DAY_IN_SECONDS
		);

		// Log the event to the logger service
		await services.logger.log({
			type: "info",
			message: `The admin ${loggedUserId} (IP: ${request.ip}) updated the admin status of the user ${user.id}.`,
			data: updatedUser,
		});
	},

	/**
	 * Handles the removal of a user.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 */
	removeUser: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		const requestParams = request.params as { userId: string };
		const loggedUserId = request.headers.userId as string;

		const user = await db.main.user.findFirst({
			where: { id: requestParams.userId },
			select: { id: true, isAdministrator: true },
		});

		// Check if the user exists
		if (!user) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusNotFound,
				message: "User not found.",
			});

			return;
		}

		// Check if the user is an admin
		if (user.isAdministrator) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusForbidden,
				message: "You cannot remove an admin user.",
			});

			await services.logger.log({
				type: "error",
				message: `The admin ${loggedUserId} (IP: ${request.ip}) tried to remove the admin user ${user.id}.`,
				data: { userId: user.id, loggedUserId },
			});

			return;
		}

		// Remove the user from the database
		await db.main.user.delete({
			where: { id: user.id },
		});

		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusOK,
			message: "User removed successfully.",
		});
	},
};
