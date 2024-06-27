import cors from "@fastify/cors";
import { FastifyInstance } from "fastify";

export default {
	registerPlugins: async (server: FastifyInstance): Promise<void> => {
		// Register CORS plugin
		await server.register(cors, {
			origin: "*",
			methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
			allowedHeaders: ["Content-Type", "Authorization"],
		});
	},
};
