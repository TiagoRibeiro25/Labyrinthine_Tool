export default {
	/**
	 * Checks if all required environment variables are set.
	 * @returns {boolean} - Returns true if all environment variables are set, otherwise false.
	 */
	areEnvsSet: (): boolean => {
		// MANDATORY ENVIRONMENT VARIABLES
		const envs = [
			"DATABASE_URL",
			"LOGGER_API_AUTH_KEY",
			"LOGGER_API_URL",
			"SALT_ROUNDS",
			"JWT_SECRET",
		];

		for (const env of envs) {
			if (!process.env[env]) {
				console.error(`Environment variable ${env} is missing`);
				return false;
			}
		}

		return true;
	},
};
