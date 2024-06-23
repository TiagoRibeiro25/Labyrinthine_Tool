// prefix: /auth

import { FastifyInstance } from "fastify";
import handlers from "../handlers";
import validations from "../validations";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// POST ${prefix}/register
	server.post(
		"/register",
		{ schema: validations.auth.register.schemas },
		handlers.auth.register
	);

	// POST ${prefix}/login
	server.post("/login", { schema: validations.auth.login.schemas }, handlers.auth.login);
	done();
};
