import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import handlers from "../handlers";
import eventsRoutes from "./events.routes";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// GET /ping
	server.get("/ping", (request: FastifyRequest, reply: FastifyReply) => {
		return handlers.ping(request, reply);
	});

	// /events
	server.register(eventsRoutes, { prefix: "/events" });

	done();
};
