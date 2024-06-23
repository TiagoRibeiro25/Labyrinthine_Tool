import { FastifyReply } from "fastify";
import services from "../services";
import httpUtils from "./http.utils";

type Options = {
	reply: FastifyReply;
	message: string;
	statusCode: number;
	error?: string;
	code?: string;
	data?: any;
};

/**
 * Utility functions for handling API responses.
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

		// Send the response
		options.reply.code(options.statusCode).send(response);
	},

	/**
	 * Handles internal server errors and sends an error response.
	 * It also sends a request to the logger service with the error details.
	 * @param reply - The Fastify reply object.
	 * @param error - The error object.
	 * @param errorMessage - The error message.
	 */
	handleInternalError: async (
		reply: FastifyReply,
		error: Error | unknown,
		errorMessage?: string
	): Promise<void> => {
		await services.logger.log({
			type: "error",
			message: errorMessage || "Internal server error",
			data: error,
		});

		console.log(`\n\nINTERNAL SERVER ERROR\n\n${error}\n\n`);

		reply.code(httpUtils.StatusInternalServerError).send({
			message: "Internal server error",
			statusCode: httpUtils.StatusInternalServerError,
			error: errorMessage || "Internal server error",
		});
	},
};
