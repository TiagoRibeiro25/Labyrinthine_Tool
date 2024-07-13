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
				hooks.onError.handleError(error, request, reply);
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
				hooks.onError.handleError(error, request, reply);
			},
		},
		handlers.users.sendFriendRequest
	);

	// PATCH ${prefix}/:userId/friends (accept friend request)
	server.patch(
		"/:userId/friends",
		{
			schema: validations.users.acceptFriendRequest.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleError(error, request, reply);
			},
		},
		handlers.users.acceptFriendRequest
	);

	// DELETE ${prefix}/:userId/friends (remove friend/request)
	server.delete(
		"/:userId/friends",
		{
			schema: validations.users.removeFriend.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleError(error, request, reply);
			},
		},
		handlers.users.removeFriend
	);

	// GET ${prefix}/:userId/friends (get user friends)
	server.get(
		"/:userId/friends",
		{
			schema: validations.users.getUserFriends.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
			errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
				hooks.onError.handleError(error, request, reply);
			},
		},
		handlers.users.getUserFriends
	);

	done();
};
