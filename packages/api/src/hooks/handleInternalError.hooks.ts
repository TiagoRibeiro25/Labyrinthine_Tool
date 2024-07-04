import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import services from "../services";

/**
 * Handles internal server errors and sends an appropriate response to the client.
 * Sends a response with a status code of 500 (Internal Server Error) and then logs the error using the logger service.
 *
 * @param error - The error object representing the internal server error.
 * @param _request - The Fastify request object.
 * @param reply - The Fastify reply object used to send the response.
 */
export default (error: FastifyError, _request: FastifyRequest, reply: FastifyReply): void => {
	reply.code(constants.HTTP.StatusInternalServerError).send({
		message: "Internal server error",
		statusCode: constants.HTTP.StatusInternalServerError,
		error: error.code,
	});

	console.log(`\n\nINTERNAL SERVER ERROR\n\n${error}\n\n`);

	// Do the logging after the response is sent to the client to avoid delayed responses
	services.logger.log({
		type: "error",
		message: "Internal server error",
		data: error,
	});
};
