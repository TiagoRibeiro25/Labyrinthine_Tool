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

		db.connectAllDatabases().then(() => {
			server.log.info("Connected to the database");

			// If the database connection is successful, start the server
			server.listen({ port: constants.ENV.PORT }, (error: Error | null, _address: string) => {
				if (error) {
					throw new Error(error.message);
				}
			});
		});
	})
	.catch((error: any) => {
		db.disconnectAllDatabases();

		console.error(error);
		process.exit(1);
	});
