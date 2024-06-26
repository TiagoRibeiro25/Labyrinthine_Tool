// prefix: /users

import { FastifyInstance } from "fastify";
import handlers from "../handlers";
import hooks from "../hooks";
import validations from "../validations";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// GET ${prefix}/users/:userId
	server.get(
		"/:userId",
		{ schema: validations.users.getUser.schemas, preHandler: hooks.handleAuthToken },
		handlers.users.getUser
	);

	done();
};
