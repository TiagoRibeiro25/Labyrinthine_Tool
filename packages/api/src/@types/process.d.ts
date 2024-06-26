declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production" | "test";
		PORT: string;
		DATABASE_URL: string;
		LOGGER_API_AUTH_KEY: string;
		LOGGER_API_URL: string;
		SALT_ROUNDS: string;
		JWT_SECRET: string;

		TOKENS_BLACKLIST_REDIS_PORT: string;
		TOKENS_BLACKLIST_REDIS_HOST: string;
		TOKENS_BLACKLIST_REDIS_PASSWORD: string;
		TOKENS_BLACKLIST_REDIS_DB: string;
	}
}
