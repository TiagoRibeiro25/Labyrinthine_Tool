import Redis from "ioredis";
import constants from "../constants";

const tokensBlackListRedisInstance = new Redis({
	port: constants.ENV.TOKENS_BLACKLIST_REDIS.PORT,
	host: constants.ENV.TOKENS_BLACKLIST_REDIS.HOST,
	password: constants.ENV.TOKENS_BLACKLIST_REDIS.PASSWORD,
	db: constants.ENV.TOKENS_BLACKLIST_REDIS.DB,
	lazyConnect: true,
});

export default tokensBlackListRedisInstance;
