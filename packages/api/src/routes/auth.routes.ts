// prefix: /auth

import { FastifyInstance } from "fastify";
import handlers from "../handlers";
import hooks from "../hooks";
import validations from "../validations";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// POST ${prefix}/register
	server.post(
		"/register",
		{ schema: validations.auth.register.schemas, onError: hooks.onError.handleInternalError },
		handlers.auth.register
	);

	// POST ${prefix}/login
	server.post(
		"/login",
		{ schema: validations.auth.login.schemas, onError: hooks.onError.handleInternalError },
		handlers.auth.login
	);

	// DELETE ${prefix}/logout
	server.delete(
		"/logout",
		{
			preValidation: hooks.preValidation.handleAuthToken,
			onError: hooks.onError.handleInternalError,
		},
		handlers.auth.logout
	);

	done();
};
