import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
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
			const isUsernameTaken = await db.user.findFirst({
				where: { username },
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
			const hashedPassword = await bcrypt.hash(
				password,
				+(process.env.SALT_ROUNDS as unknown as string)
			);

			// Add the user to the database
			const user = await db.user.create({
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
			const user = await db.user.findFirst({
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

			// Send the response
			utils.response.send({
				reply,
				statusCode: utils.http.StatusOK,
				message: "Logged in successfully",
				data: {
					token: utils.jwt.generateToken(user.id), // Auth token
				},
			});
		} catch (error) {
			await utils.response.handleInternalError(reply, error);
		}
	},
};
