// prefix: /cosmetics

import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import handlers from "../handlers";
import hooks from "../hooks";
import validations from "../validations";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// GET ${prefix}/:cosmeticId
	server.get(
		"/:cosmeticId",
		{
			schema: validations.cosmetics.getCosmetic.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleInternalError(error, request, reply);
			},
		},
		handlers.cosmetics.getCosmetic
	);

	done();
};
