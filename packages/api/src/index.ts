import fastify from "fastify";
import config from "./config";
import db from "./db";
import routes from "./routes";
import utils from "./utils";

if (!utils.envs.areEnvsSet()) {
	process.exit(1);
}

const server = fastify(config.fastify);

// Register version 1 routes
server.register(routes, { prefix: "/api/v1" });

db.$connect()
	.then(() => {
		console.log("Connected to the database");

		server.listen(
			{ port: +(process.env.PORT || config.fallbacks.port) },
			(err: Error | null, address: string) => {
				if (err) {
					db.$disconnect();
					console.error(err);
					process.exit(1);
				}

				console.log(`Server listening at ${address}`);
			}
		);
	})
	.catch((err: any) => {
		console.error(err);
		process.exit(1);
	});
