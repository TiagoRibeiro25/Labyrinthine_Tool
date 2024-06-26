import Redis from "ioredis";
import constants from "../constants";

// TODO: Change these to environment variables
const tokensBlackListRedisInstance = new Redis({
	port: +(
		process.env.TOKENS_BLACKLIST_REDIS_PORT || constants.FALLBACKS.TOKENS_BLACKLIST_REDIS.PORT
	),
	host:
		process.env.TOKENS_BLACKLIST_REDIS_HOST || constants.FALLBACKS.TOKENS_BLACKLIST_REDIS.HOST,
	password:
		process.env.TOKENS_BLACKLIST_REDIS_PASSWORD ||
		constants.FALLBACKS.TOKENS_BLACKLIST_REDIS.PASSWORD,
	db: +(
		process.env.TOKENS_BLACKLIST_REDIS_DB || constants.FALLBACKS.TOKENS_BLACKLIST_REDIS.DB
	),
	lazyConnect: true,
});

export default tokensBlackListRedisInstance;
