import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import handlers from "../handlers";
import authRoutes from "./auth.routes";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// GET /ping
	server.get("/ping", (request: FastifyRequest, reply: FastifyReply) => {
		return handlers.ping(request, reply);
	});

	// /auth
	server.register(authRoutes, { prefix: "/auth" });

	done();
};
