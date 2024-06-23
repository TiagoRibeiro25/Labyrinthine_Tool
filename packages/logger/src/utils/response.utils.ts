import { FastifyReply, FastifyRequest } from "fastify";
import db from "../db";
import http from "./http.utils";
import sourceUtils from "./source.utils";

type Options = {
	reply: FastifyReply;
	message: string;
	statusCode: number;
	error?: string;
	code?: string;
	data?: any;
};

/**
 * Utility functions for handling responses.
 */
export default {
	/**
	 * Sends a response with the provided options.
	 * @param options - The response options.
	 */
	send: (options: Options): void => {
		const response = {
			message: options.message,
			statusCode: options.statusCode,
			error: options.error,
			code: options.code,
			data: options.data,
		};

		// If the response doesn't have an error, don't include it in the response
		if (!options.error) {
			delete response.error;
		}

		// If the response doesn't have a code, don't include it in the response
		if (!options.code) {
			delete response.code;
		}

		// If the response doesn't have data, don't include it in the response
		if (!options.data) {
			delete response.data;
		}

		options.reply.code(options.statusCode).send(response);
	},

	/**
	 * Handles an internal server error.
	 * It logs the error and sends a response with a 500 status code.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 * @param error - The error object.
	 * @param errorMessage - The error message.
	 */
	handleInternalError: async (
		request: FastifyRequest,
		reply: FastifyReply,
		error: Error | unknown,
		errorMessage?: string
	): Promise<void> => {
		try {
			await db.event.create({
				service: sourceUtils.get(request), // Get the name of the service source
				type: "error",
				message: "An internal server error occurred",
				data: error instanceof Error ? error.message : error,
			});
		} catch (_) {}

		console.log(`\n\nINTERNAL SERVER ERROR\n\n${error}\n\n`);

		reply.code(http.StatusInternalServerError).send({
			message: "Internal server error",
			error: errorMessage || "Internal server error",
			statusCode: http.StatusInternalServerError,
		});
	},
};
