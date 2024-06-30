import Redis from "ioredis";
import constants from "../constants";

const adminListRedisInstance: Redis = new Redis({
	port: constants.ENV.ADMIN_LIST_REDIS.PORT,
	host: constants.ENV.ADMIN_LIST_REDIS.HOST,
	password: constants.ENV.ADMIN_LIST_REDIS.PASSWORD,
	db: constants.ENV.ADMIN_LIST_REDIS.DB,
	lazyConnect: true,
});

export default adminListRedisInstance;
