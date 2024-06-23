import { FastifyReply, FastifyRequest } from "fastify";
import utils from "../utils";

export default (_request: FastifyRequest, reply: FastifyReply): void => {
	return utils.response.send({
		reply,
		statusCode: utils.http.StatusOK,
		message: "pong",
	});
};
