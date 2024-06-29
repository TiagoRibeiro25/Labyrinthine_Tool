import Redis from "ioredis";
import constants from "../constants";

const suspectIpsRedisInstance = new Redis({
	port: constants.ENV.SUSPECT_IPS_REDIS.PORT,
	host: constants.ENV.SUSPECT_IPS_REDIS.HOST,
	password: constants.ENV.SUSPECT_IPS_REDIS.PASSWORD,
	db: constants.ENV.SUSPECT_IPS_REDIS.DB,
	lazyConnect: true,
});

export default suspectIpsRedisInstance;
