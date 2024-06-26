import { FastifyInstance } from "fastify";
import handlers from "../handlers";
import authRoutes from "./auth.routes";
import usersRoutes from "./users.routes";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// GET /ping
	server.get("/ping", handlers.ping);

	// /auth
	server.register(authRoutes, { prefix: "/auth" });

	// /users
	server.register(usersRoutes, { prefix: "/users" });

	done();
};
