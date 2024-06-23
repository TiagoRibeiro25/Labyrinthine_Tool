import { FastifyInstance, FastifyRequest } from "fastify";
import utils from "../utils";

// prefix: /users

export default (server: FastifyInstance, opts: { prefix: string }, done: () => void) => {
	// GET ${prefix}/
	server.get("/", (request: FastifyRequest, reply) => {
		try {
			return utils.response.send({
				reply,
				statusCode: utils.http.StatusOK,
				message: "Users route",
				data: [{ id: 1, name: "John Doe" }],
			});
		} catch (error) {
			utils.response.handleInternalError(reply, error);
		}
	});

	done();
};
