// prefix: /auth

import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import handlers from "../handlers";
import hooks from "../hooks";
import validations from "../validations";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// POST ${prefix}/register
	server.post(
		"/register",
		{
			schema: validations.auth.register.schemas,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleInternalError(error, request, reply);
			},
		},
		handlers.auth.register
	);

	// POST ${prefix}/login
	server.post(
		"/login",
		{
			schema: validations.auth.login.schemas,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleInternalError(error, request, reply);
			},
		},
		handlers.auth.login
	);

	// DELETE ${prefix}/logout
	server.delete(
		"/logout",
		{
			preValidation: hooks.preValidation.handleAuthToken,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleInternalError(error, request, reply);
			},
		},
		handlers.auth.logout
	);

	done();
};
