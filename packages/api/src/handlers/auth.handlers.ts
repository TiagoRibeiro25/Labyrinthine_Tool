import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import services from "../services";
import utils from "../utils";

/**
 * Auth handlers for user registration, login, and logout.
 */
export default {
	/**
	 * Handles user registration.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 */
	register: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		// Extract request body parameters
		const { username, password, discordUsername, steamProfileUrl } = request.body as {
			username: string;
			password: string;
			discordUsername: string;
			steamProfileUrl: string;
		};

		// TODO: Add a regex to validate the username

		// Check if there's a user with the same username
		const isUsernameTaken = await db.main.user.findFirst({
			where: {
				username: {
					equals: username,
					mode: "insensitive",
				},
			},
			select: { id: true },
		});

		if (isUsernameTaken) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusBadRequest,
				message: "Username is already taken",
			});
			return;
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, constants.ENV.SALT_ROUNDS);

		// Add the user to the database
		const user = await db.main.user.create({
			data: {
				username,
				password: hashedPassword,
				discordUsername,
				steamProfileUrl,
			},
			select: {
				id: true,
				username: true,
				// If the value was in the request, it will be included in the response
				discordUsername: !!discordUsername,
				steamProfileUrl: !!steamProfileUrl,
				createdAt: true,
				updatedAt: true,
			},
		});

		// Send the response
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusCreated,
			message: "Account created successfully",
			data: user,
		});

		// Log the user creation
		await services.logger.log({
			type: "info",
			message: "A new user has been created",
			data: user,
		});
	},

	/**
	 * Handles user login.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 */
	login: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		// Extract request body parameters
		const { username, password } = request.body as {
			username: string;
			password: string;
		};

		// Check if the user exists
		const user = await db.main.user.findFirst({
			where: {
				username: {
					equals: username,
					mode: "insensitive",
				},
			},
			select: { id: true, password: true },
		});

		if (!user) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusNotFound,
				message: "There's no user with that username",
			});
			return;
		}

		// Compare the passwords
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			utils.response.send({
				reply,
				statusCode: constants.HTTP.StatusUnauthorized,
				message: "Invalid credentials",
			});
			return;
		}

		const authToken = utils.jwt.generateToken(user.id, request.ip);

		// Send the response
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusOK,
			message: "Logged in successfully",
			data: { token: authToken },
		});
	},

	/**
	 * Handles user logout.
	 * @param request - The Fastify request object.
	 * @param reply - The Fastify reply object.
	 */
	logout: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
	},
};
