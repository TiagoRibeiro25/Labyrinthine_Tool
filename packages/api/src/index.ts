import fastify from "fastify";
import config from "./config";
import constants from "./constants";
import db from "./db";
import plugins from "./plugins";
import routes from "./routes";
import utils from "./utils";

if (!utils.envs.areEnvsSet()) {
	process.exit(1);
}

const server = fastify(config.fastify);

plugins
	.registerPlugins(server)
	.then(() => {
		// Register version 1 routes
		server.register(routes, { prefix: "/api/v1" });
		// Other versions of the API can be registered here

		Promise.all([db.main.$connect(), db.tokensBlackListRedis.connect()]).then(() => {
			console.log("Connected to the database");

			server.listen({ port: constants.ENV.PORT }, (err: Error | null, address: string) => {
				if (err) {
					throw new Error(err.message);
				}

				console.log(`Server listening at ${address}`);
			});
		});
	})
	.catch((err: any) => {
		try {
			db.main.$disconnect();
			db.tokensBlackListRedis.disconnect();
		} catch (_error) {}

		console.error(err);
		process.exit(1);
	});
