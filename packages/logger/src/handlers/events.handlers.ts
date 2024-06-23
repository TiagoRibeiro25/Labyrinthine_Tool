import { FastifyReply, FastifyRequest } from "fastify";
import db from "../db";
import utils from "../utils";

/**
 * Logs an event and saves it to the database.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A promise that resolves to void.
 */
export default {
	logEvent: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		try {
			const { type, message, data } = request.body as {
				type: string;
				message: string;
				data: any;
			};

			let serviceName;
			try {
				serviceName = await utils.source.get(request); // Get the name of the service source
			} catch (_error) {
				serviceName = "Unknown";
			}

			// Add the event to the database
			const event = await db.event.create({
				service: serviceName,
				type,
				message,
				data,
			});

			utils.response.send({
				reply,
				statusCode: utils.http.StatusCreated,
				message: "Event created",
				data: event,
			});
		} catch (error) {
			utils.response.handleInternalError(
				request,
				reply,
				error,
				"An error occurred while logging the event"
			);
		}
	},
};
