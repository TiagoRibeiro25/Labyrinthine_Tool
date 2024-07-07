export default {
	/**
	 * Validates a username.
	 * @param username - The username to be validated.
	 * @returns An object with the validation result and a message.
	 */
	username: (username: string): { valid: boolean; message: string } => {
		if (username.trim().length < 5) {
			return { valid: false, message: "Username must be at least 5 characters long" };
		}

		if (username.trim().length > 20) {
			return { valid: false, message: "Username must be at most 20 characters long" };
		}

		if (!/^[a-zA-Z0-9_]+$/.test(username)) {
			return {
				valid: false,
				message: "Username can only contain letters, numbers and underscores",
			};
		}

		if (!/[a-zA-Z]{3}/.test(username)) {
			return { valid: false, message: "Username must contain at least 3 letters" };
		}

		return { valid: true, message: "" };
	},
};
