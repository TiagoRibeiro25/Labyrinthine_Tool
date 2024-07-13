import constants from "../../constants";
import { FastifyRequest, FastifyReply } from "fastify";
import db from "../../db";
import utils from "../../utils";

/**
 * Handles user logout.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	const authToken = request.headers.authorization as string;

	// Blacklist the token
	await db.tokensBlackListRedis.set(
		authToken,
		"true",
		"EX",
		constants.TIME.ONE_HOUR_IN_SECONDS // After 1 hour, this blacklisted token will be removed from the database
	);

	// Remove the user from admin list (redis)
	await db.adminListRedisInstance.del(authToken);

	utils.response.send({
		reply,
		statusCode: constants.HTTP.StatusOK,
		message: "Session ended successfully",
	});
};
