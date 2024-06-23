import { FastifyInstance } from "fastify";
import handlers from "../handlers";
import validation from "../validations";

// prefix: /events

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// POST ${prefix}/
	server.post("/", { schema: validation.events.logEvent.schemas }, handlers.events.logEvent);

	done();
};
