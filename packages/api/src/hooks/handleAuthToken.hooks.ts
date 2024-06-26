import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import utils from "../utils";

const PROTECTED_ROUTES: string[] = [
	`${constants.BASE_URL}/ping`,
	// TODO: Update this to the actual protected routes
];

function handleUnauthorized(reply: FastifyReply): void {
	utils.response.send({
		reply,
		statusCode: utils.http.StatusUnauthorized,
		message: "Unauthorized",
	});
}

export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	try {
		if (!PROTECTED_ROUTES.includes(request.url)) {
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

		// TODO: Check if this blacklist redis logic is working as expected

		// Check if the token is blacklisted (by checking the redis blacklist database)
		const isTokenBlackListed = await db.tokensBlackListRedis.get(authToken);
		if (isTokenBlackListed) {
			handleUnauthorized(reply);
			return;
		}

		// Check if the token will expire in the next hour
		if (parsedTokenResult.data.exp - Date.now() < constants.ONE_HOUR_IN_MS) {
			// If so, refresh the token
			const newToken = utils.jwt.generateToken(parsedTokenResult.data.userId, request.ip);

			// Add the new token to the headers
			reply.header("authorization", newToken.token);

			// Add the previous token to the blacklist
			await db.tokensBlackListRedis.set(
				authToken,
				"true",
				"EX",
				constants.ONE_HOUR_IN_SECONDS // After 1 hour, this blacklisted token will be removed from the database
			);
		}

		return;
	} catch (error) {
		utils.response.handleInternalError(reply, error);
	}
};
