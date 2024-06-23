declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production" | "test";
		PORT: number;
		DATABASE_URL: string;
		LOGGER_API_AUTH_KEY: string;
		LOGGER_API_URL: string;
	}
}
