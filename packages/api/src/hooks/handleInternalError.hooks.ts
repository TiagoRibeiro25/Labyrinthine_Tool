import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import services from "../services";

/**
 * Handles internal server errors and sends an error response.
 * It also sends a request to the logger service with the error details.
 * @param reply - The Fastify reply object.
 * @param error - The error object.
 * @param errorMessage - The error message.
 */
export default async (
	_request: FastifyRequest,
	reply: FastifyReply,
	error: FastifyError
): Promise<void> => {
	reply.code(constants.HTTP.StatusInternalServerError).send({
		message: "Internal server error",
		statusCode: constants.HTTP.StatusInternalServerError,
		error: error.code,
	});

	console.log(`\n\nINTERNAL SERVER ERROR\n\n${error}\n\n`);

	// Do the logging after the response is sent to the client to avoid delayed responses
	await services.logger.log({
		type: "error",
		message: "Internal server error",
		data: error,
	});
};
