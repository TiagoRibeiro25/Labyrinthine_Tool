import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import constants from "../constants";
import db from "../db";
import services from "../services";
import utils from "../utils";

export default {
	register: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		const { username, password, discordUsername, steamProfileUrl } = request.body as {
			username: string;
			password: string;
			discordUsername: string;
			steamProfileUrl: string;
		};

		try {
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
					statusCode: utils.http.StatusBadRequest,
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

			// Log the user creation
			await services.logger.log({
				type: "info",
				message: "A new user has been created",
				data: user,
			});

			// Send the response
			utils.response.send({
				reply,
				statusCode: utils.http.StatusCreated,
				message: "Account created successfully",
				data: user,
			});
		} catch (error) {
			await utils.response.handleInternalError(reply, error);
		}
	},

	login: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		const { username, password } = request.body as {
			username: string;
			password: string;
		};

		try {
			// Check if the user exists
			const user = await db.main.user.findFirst({
				where: { username },
				select: { id: true, password: true },
			});

			if (!user) {
				utils.response.send({
					reply,
					statusCode: utils.http.StatusNotFound,
					message: "There's no user with that username",
				});
				return;
			}

			// Compare the passwords
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				utils.response.send({
					reply,
					statusCode: utils.http.StatusUnauthorized,
					message: "Invalid credentials",
				});
				return;
			}

			const authToken = utils.jwt.generateToken(user.id, request.ip);

			// Send the response
			utils.response.send({
				reply,
				statusCode: utils.http.StatusOK,
				message: "Logged in successfully",
				data: { token: authToken },
			});
		} catch (error) {
			await utils.response.handleInternalError(reply, error);
		}
	},

	logout: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		try {
			const authToken = request.headers.authorization as string;

			// Blacklist the token
			await db.tokensBlackListRedis.set(
				authToken,
				"true",
				"EX",
				constants.TIME.ONE_HOUR_IN_SECONDS // After 1 hour, this blacklisted token will be removed from the database
			);

			utils.response.send({
				reply,
				statusCode: utils.http.StatusOK,
				message: "Session ended successfully",
			});
		} catch (error) {
			utils.response.handleInternalError(reply, error);
		}
	},
};
