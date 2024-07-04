// PRE-HANDLER

import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import services from "../services";
import utils from "../utils";

function handleUnauthorized(reply: FastifyReply): void {
	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusUnauthorized,
		message: "Unauthorized",
	});
}

/**
 * Handles the authentication token for incoming requests.
 * Checks if the source IP is in the suspect IPs database,
 * validates the authorization token, checks if the token is blacklisted,
 * refreshes the token if necessary, and adds the user ID to the request headers.
 *
 * @param request - The FastifyRequest object representing the incoming request.
 * @param reply - The FastifyReply object representing the outgoing response.
 * @returns A Promise that resolves to void.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	// Check if the source ip is in the suspect ips database
	const suspectIpRequests = await db.suspectIpsRedisInstance.get(request.ip);
	if (
		suspectIpRequests &&
		+suspectIpRequests >= constants.SUSPECT_IPS_REDIS.NUMBER_OF_REQUESTS_BEFORE_BLOCKING
	) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusForbidden,
			message: "You are temporarily blocked from accessing this route.",
		});
		return;
	}

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

		// Find if the ip exists
		const ipExists = await db.suspectIpsRedisInstance.get(request.ip);

		// If it doesn't, add it to the database
		if (!ipExists) {
			await db.suspectIpsRedisInstance.set(
				request.ip,
				"1",
				"EX",
				constants.TIME.ONE_DAY_IN_SECONDS // After 1 day, this ip will be removed from the database
			);
		} else {
			await db.suspectIpsRedisInstance.incr(request.ip); // If it does, increment the number of requests
		}

		handleUnauthorized(reply);
		return;
	}

	// Check if the token will expire in the next hour and if the current route is not /auth/logout
	if (
		parsedTokenResult.data.expiresAt - Date.now() < constants.TIME.ONE_HOUR_IN_MS &&
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
			constants.TIME.ONE_HOUR_IN_SECONDS // After 1 hour, this blacklisted token will be removed from the database
		);
	}

	// Add the user id to the request headers so that it can be used by the next handler/s
	request.headers["userId"] = parsedTokenResult.data.userId;
};
