import { FastifyRequest, FastifyReply } from "fastify";
import constants from "../../constants";
import db from "../../db";
import utils from "../../utils";
import bcrypt from "bcryptjs";

/**
 * Handles user login.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
export default async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
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
		select: { id: true, password: true, username: true },
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
		data: {
			token: authToken,
			user: {
				id: user.id,
				username: user.username,
			},
		},
	});
};
