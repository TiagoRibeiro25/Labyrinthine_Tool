// prefix: /users

import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import handlers from "../handlers";
import hooks from "../hooks";
import validations from "../validations";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// GET ${prefix}/:userId
	server.get(
		"/:userId",
		{
			schema: validations.users.getUser.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleInternalError(error, request, reply);
			},
		},
		handlers.users.getUser
	);

	// POST ${prefix}/:userId/friends (send friend request)
	server.post(
		"/:userId/friends",
		{
			schema: validations.users.sendFriendRequest.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleInternalError(error, request, reply);
			},
		},
		handlers.users.sendFriendRequest
	);

	done();
};
