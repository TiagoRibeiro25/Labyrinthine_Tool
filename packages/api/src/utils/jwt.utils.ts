import jwt from "jsonwebtoken";

type ParsedToken = {
	userId: string;
	requestIp: string;
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
	 * @returns The generated JWT token and expiration date.
	 */
	generateToken: (userId: string, requestIp: string): { token: string; expiresAt: Date } => {
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + DAYS_TO_EXPIRE); // DAYS_TO_EXPIRE days from now

		const token = jwt.sign({ userId, requestIp }, process.env.JWT_SECRET as string, {
			expiresIn: `${DAYS_TO_EXPIRE}d`,
		});

		return { token, expiresAt };
	},

	parseToken: (token: string): ParseTokenResult => {
		try {
			const result = jwt.verify(token, process.env.JWT_SECRET as string) as ParsedToken;

			return {
				success: true,
				data: result,
			};
		} catch (_error) {
			return { success: false };
		}
	},
};
