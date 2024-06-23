import { FastifyReply, FastifyRequest } from "fastify";
import utils from "../utils";

/**
 * Handles the ping request and sends a "pong" response.
 *
 * @param _request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
export default (_request: FastifyRequest, reply: FastifyReply): void => {
	return utils.response.send({
		reply,
		statusCode: utils.http.StatusOK,
		message: "pong",
	});
};
