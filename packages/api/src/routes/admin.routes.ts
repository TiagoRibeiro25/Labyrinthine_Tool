// prefix: /admin

import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import handlers from "../handlers";
import hooks from "../hooks";
import validations from "../validations";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// POST ${prefix}/cosmetics
	server.post(
		"/cosmetics",
		{
			schema: validations.admin.addCosmetic.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
			preHandler: hooks.preHandler.handleAdminValidation,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleInternalError(error, request, reply);
			},
		},
		handlers.admin.addCosmetic
	);

	// DELETE ${prefix}/cosmetics/:cosmeticId
	server.delete(
		"/cosmetics/:cosmeticId",
		{
			schema: validations.admin.deleteCosmetic.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
			preHandler: hooks.preHandler.handleAdminValidation,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleInternalError(error, request, reply);
			},
		},
		handlers.admin.deleteCosmetic
	);

	// PATCH ${prefix}/users/:userId (toggle admin status)
	server.patch(
		"/users/:userId",
		{
			schema: validations.admin.toggleUserAdminStatus.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
			preHandler: hooks.preHandler.handleAdminValidation,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleInternalError(error, request, reply);
			},
		},
		handlers.admin.toggleUserAdminStatus
	);

	// DELETE ${prefix}/users/:userId
	server.delete(
		"/users/:userId",
		{
			schema: validations.admin.removeUser.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
			preHandler: hooks.preHandler.handleAdminValidation,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleInternalError(error, request, reply);
			},
		},
		handlers.admin.removeUser
	);

	done();
};
