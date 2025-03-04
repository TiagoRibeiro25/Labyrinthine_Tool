declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production" | "test";
		PORT: number;
		DATABASE_URL: string;
		API_AUTH_KEY: string;
	}
}
