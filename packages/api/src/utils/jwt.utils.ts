import jwt from "jsonwebtoken";

export default {
	generateToken: (userId: string): string => {
		return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
			expiresIn: "1d",
		});
	},
};
