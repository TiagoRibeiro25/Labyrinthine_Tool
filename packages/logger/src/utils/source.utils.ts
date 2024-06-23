import { FastifyRequest } from "fastify";
import config from "../config";
import db from "../db";

/**
 * Retrieves the service source name based on the authorization header from the request.
 * @param request - The FastifyRequest object representing the incoming request.
 * @returns A Promise that resolves to a string representing the source.
 * @throws An error if no authorization header is provided.
 */
export default {
	get: async (request: FastifyRequest): Promise<string> => {
		if (!request.headers.authorization) {
			try {
				await db.event.create({
					service: "Logger",
					type: "error",
					message:
						"No authorization header provided. This should not be possible. Please investigate.",
				});
			} catch (_) {}

			throw new Error("No authorization header provided");
		}

		return config.sources[request.headers.authorization];
	},
};
