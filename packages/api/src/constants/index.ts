export default {
	BASE_URL: "/api/v1",
	ONE_HOUR_IN_MS: 60 * 60 * 1000,
	ONE_HOUR_IN_SECONDS: 60 * 60,

	FALLBACKS: {
		PORT: 5000,
		NODE_ENV: "development",

		TOKENS_BLACKLIST_REDIS: {
			PORT: 6379,
			HOST: "127.0.0.1",
			PASSWORD: "",
			DB: 0,
		},
	},
};
