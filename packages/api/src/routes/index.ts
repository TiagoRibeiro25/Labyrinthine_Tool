import { FastifyInstance } from "fastify";
import handlers from "../handlers";
import adminRoutes from "./admin.routes";
import authRoutes from "./auth.routes";
import cosmeticsRoutes from "./cosmetics.routes";
import usersRoutes from "./users.routes";

export default (server: FastifyInstance, _opts: { prefix: string }, done: () => void) => {
	// GET /ping
	server.get("/ping", handlers.ping);

	// /auth
	server.register(authRoutes, { prefix: "/auth" });

	// /users
	server.register(usersRoutes, { prefix: "/users" });

	// /cosmetics
	server.register(cosmeticsRoutes, { prefix: "/cosmetics" });

	// /admin
	server.register(adminRoutes, { prefix: "/admin" });

	done();
};
