export default {
	BASE_URL: "/api/v1",

	TIME: {
		ONE_HOUR_IN_MS: 60 * 60 * 1000,
		ONE_HOUR_IN_SECONDS: 60 * 60,
		ONE_DAY_IN_SECONDS: 60 * 60 * 24,
	},

	ENV: {
		NODE_ENV: process.env.NODE_ENV || "development",
		PORT: +(process.env.PORT || 5000),

		// These are mandatory, so the server won't start if they are not set (meaning they can't be undefined).
		DATABASE_URL: process.env.DATABASE_URL as string,
		LOGGER_API_AUTH_KEY: process.env.LOGGER_API_AUTH_KEY as string,
		LOGGER_API_URL: process.env.LOGGER_API_URL as string,
		SALT_ROUNDS: +(process.env.SALT_ROUNDS as string),
		JWT_SECRET: process.env.JWT_SECRET as string,

		TOKENS_BLACKLIST_REDIS: {
			PORT: +(process.env.TOKENS_BLACKLIST_REDIS_PORT || 6379),
			HOST: process.env.TOKENS_BLACKLIST_REDIS_HOST || "127.0.0.1",
			PASSWORD: process.env.TOKENS_BLACKLIST_REDIS_PASSWORD || "",
			DB: +(process.env.TOKENS_BLACKLIST_REDIS_DB || 0),
		},

		SUSPECT_IPS_REDIS: {
			PORT: +(process.env.SUSPECT_IPS_REDIS_PORT || 6379),
			HOST: process.env.SUSPECT_IPS_REDIS_HOST || "127.0.0.1",
			PASSWORD: process.env.SUSPECT_IPS_REDIS_PASSWORD || "",
			DB: +(process.env.SUSPECT_IPS_REDIS_DB || 1),
			NUMBER_OF_REQUESTS_BEFORE_BLOCKING: +(
				process.env.NUMBER_OF_REQUESTS_BEFORE_BLOCKING || 3
			),
		},
	},
};
