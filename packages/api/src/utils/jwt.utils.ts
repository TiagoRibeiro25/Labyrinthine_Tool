import jwt from "jsonwebtoken";
import constants from "../constants";

type ParsedToken = {
	userId: string;
	requestIp: string;
	expiresAt: number;
	iat: number;
	exp: number;
};

type ParseTokenResult = {
	success: boolean;
	data?: ParsedToken;
};

// The amount of days before the token expires
const DAYS_TO_EXPIRE = 1;

/**
 * Utility functions for working with JWT tokens.
 */
export default {
	/**
	 * Generates a JWT token for the specified user ID.
	 * @param userId - The ID of the user.
	 * @param requestIp - The IP address of the request source.
	 * @returns The generated JWT token.
	 */
	generateToken: (userId: string, requestIp: string): string => {
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + DAYS_TO_EXPIRE); // DAYS_TO_EXPIRE days from now

		const token = jwt.sign({ userId, requestIp, expiresAt }, constants.ENV.JWT_SECRET, {
			expiresIn: `${DAYS_TO_EXPIRE}d`,
		});

		return token;
	},

	parseToken: (token: string): ParseTokenResult => {
		try {
			const result = jwt.verify(token, constants.ENV.JWT_SECRET) as ParsedToken;

			return {
				success: true,
				data: result,
			};
		} catch (_error) {
			return { success: false };
		}
	},
};
