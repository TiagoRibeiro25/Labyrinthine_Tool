import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import services from "../services";
import utils from "../utils";

export default (error: FastifyError, _request: FastifyRequest, reply: FastifyReply): void => {
	if (error.statusCode && error.statusCode < 500) {
		return utils.response.send({
			reply,
			statusCode: error.statusCode,
			code: error.code,
			error: error.name,
			message: error.message,
		});
	}

	// INTERNAL SERVER ERROR

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusInternalServerError,
		message: "Internal server error",
		error: error.code,
		code: error.code,
	});

	console.log(`\n\nINTERNAL SERVER ERROR\n\n${error}\n\n`);

	// Do the logging after the response is sent to the client to avoid delayed responses
	services.logger.log({
		type: "error",
		message: "Internal server error",
		data: error,
	});
};
