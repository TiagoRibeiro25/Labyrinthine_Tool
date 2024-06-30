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

		SUSPECT_IPS_REDIS_PORT: string;
		SUSPECT_IPS_REDIS_HOST: string;
		SUSPECT_IPS_REDIS_PASSWORD: string;
		SUSPECT_IPS_REDIS_DB: string;

		ADMIN_LIST_REDIS_PORT: string;
		ADMIN_LIST_REDIS_HOST: string;
		ADMIN_LIST_REDIS_PASSWORD: string;
		ADMIN_LIST_REDIS_DB: string;
	}
}
