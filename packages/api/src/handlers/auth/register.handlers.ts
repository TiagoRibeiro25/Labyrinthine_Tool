import { FastifyRequest, FastifyReply } from "fastify";
import constants from "../../constants";
import db from "../../db";
import services from "../../services";
import utils from "../../utils";
import bcrypt from "bcryptjs";

/**
 * Handles user registration.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
	// Extract request body parameters
	const { username, password, discordUsername, steamProfileUrl } = request.body as {
		username: string;
		password: string;
		discordUsername: string;
		steamProfileUrl: string;
	};

	const usernameValidation = utils.validateData.username(username);
	if (!usernameValidation.valid) {
		utils.response.send({
			reply,
			statusCode: constants.HTTP.StatusBadRequest,
			message: usernameValidation.message,
		});

		return;
	}

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
};
