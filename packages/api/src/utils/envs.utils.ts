/**
 * Checks if all required environment variables are set.
 * @returns {boolean} - Returns true if all environment variables are set, otherwise false.
 */
export default {
	areEnvsSet: (): boolean => {
		const envs = ["NODE_ENV", "PORT", "DATABASE_URL", "LOGGER_API_AUTH_KEY", "LOGGER_API_URL"];

		for (const env of envs) {
			if (!process.env[env]) {
				console.error(`Environment variable ${env} is missing`);
				return false;
			}
		}

		return true;
	},
};
