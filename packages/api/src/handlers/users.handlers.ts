import { FastifyReply, FastifyRequest } from "fastify";
import utils from "../utils";

export default {
	getUser: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		try {
			console.log("Hello User");

			utils.response.send({
				reply,
				statusCode: utils.http.StatusOK,
				message: "get user successfully",
			});
		} catch (error) {
			utils.response.handleInternalError(reply, error);
		}
	},
};
