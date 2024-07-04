// prefix: /admin

import { FastifyInstance } from "fastify";
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
			onError: hooks.onError.handleInternalError,
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
			onError: hooks.onError.handleInternalError,
		},
		handlers.admin.deleteCosmetic
	);

	done();
};
