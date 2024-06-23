import { FastifyInstance } from "fastify";
import handlers from "../handlers";
import validations from "../validations";

// prefix: /events

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// POST ${prefix}/
	server.post("/", { schema: validations.events.logEvent.schemas }, handlers.events.logEvent);

	done();
};
