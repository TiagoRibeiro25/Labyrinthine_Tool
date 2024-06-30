// prefix: /users

import { FastifyInstance } from "fastify";
import handlers from "../handlers";
import hooks from "../hooks";
import validations from "../validations";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// GET ${prefix}/users/:userId
	server.get(
		"/:userId",
		{
			schema: validations.users.getUser.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
		},
		handlers.users.getUser
	);

	// POST ${prefix}/users/:userId/sendFriendRequest
	server.post(
		"/:userId/sendFriendRequest",
		{
			schema: validations.users.sendFriendRequest.schemas,
			preValidation: hooks.preValidation.handleAuthToken,
		},
		handlers.users.sendFriendRequest
	);

	done();
};
