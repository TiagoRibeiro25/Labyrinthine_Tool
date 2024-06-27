// PRE-HANDLER

import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import services from "../services";
import utils from "../utils";

function handleUnauthorized(reply: FastifyReply): void {
	utils.response.send({
		reply,
		statusCode: utils.http.StatusUnauthorized,
		message: "Unauthorized",
	});
}

export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	try {
		const authToken = request.headers.authorization;

		// Check if there's an authorization header
		if (!authToken) {
			handleUnauthorized(reply);
			return;
		}

		// Check if the token is valid
		const parsedTokenResult = utils.jwt.parseToken(authToken);

		if (!parsedTokenResult.success || !parsedTokenResult.data) {
			handleUnauthorized(reply);
			return;
		}

		// Check if the ip stored in the token matches the request's ip
		if (request.ip !== parsedTokenResult.data.requestIp) {
			handleUnauthorized(reply);
			return;
		}

		// Check if the token is blacklisted (by checking the redis blacklist database)
		const isTokenBlackListed = await db.tokensBlackListRedis.get(authToken);
		if (isTokenBlackListed) {
			await services.logger.log({
				type: "error",
				message: `The ip ${request.ip} tried to access the route ${request.url} with a blacklisted token.`,
			});

			// TODO: Add the ip to a redis database (if it already exists, increase the count by 1)
			// If the counter is greater than 3, block the ip for 1 hour
			// If the ip got flagged (blocked for 1 hour), more than 2 times, flag it as suspicious

			handleUnauthorized(reply);
			return;
		}

		// Check if the token will expire in the next hour and if the current route is not /auth/logout
		if (
			parsedTokenResult.data.expiresAt - Date.now() < constants.ONE_HOUR_IN_MS &&
			request.url !== `${constants.BASE_URL}/auth/logout`
		) {
			// If so, refresh the token
			const newToken = utils.jwt.generateToken(parsedTokenResult.data.userId, request.ip);

			// Add the new token to the response headers
			reply.header("authorization", newToken);

			// Add the previous token to the blacklist
			await db.tokensBlackListRedis.set(
				authToken,
				"true",
				"EX",
				constants.ONE_HOUR_IN_SECONDS // After 1 hour, this blacklisted token will be removed from the database
			);
		}

		// Add the user id to the request headers so that it can be used by the next handler/s
		request.headers["userId"] = parsedTokenResult.data.userId;

		return;
	} catch (error) {
		utils.response.handleInternalError(reply, error);
	}
};
