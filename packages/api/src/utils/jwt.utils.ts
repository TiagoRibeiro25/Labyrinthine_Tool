import jwt from "jsonwebtoken";

export default {
	/**
	 * Utility function for generating a JWT token.
	 * @param userId - The ID of the user.
	 * @returns The generated JWT token.
	 */
	generateToken: (userId: string): string => {
		return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
			expiresIn: "1d",
		});
	},
};
