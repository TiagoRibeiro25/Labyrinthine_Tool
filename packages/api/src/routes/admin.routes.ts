// prefix: /admin

import { FastifyInstance } from "fastify";
import handlers from "../handlers";
import hooks from "../hooks";
import validations from "../validations";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// POST ${prefix}/cosmetics
	server.post(
		"/",
		{
			schema: validations.admin.addCosmetic.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
			preHandler: hooks.preHandler.handleAdminValidation,
		},
		handlers.admin.addCosmetic
	);

	done();
};
