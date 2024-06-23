import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import handlers from "../handlers";
import usersRoutes from "./users.routes";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// GET /ping
	server.get("/ping", (request: FastifyRequest, reply: FastifyReply) => {
		return handlers.ping(request, reply);
	});

	// /users
	server.register(usersRoutes, { prefix: "/users" });

	done();
};
