import Redis from "ioredis";

// TODO: Change these to environment variables
const tokensBlackListRedisInstance = new Redis({
	port: 6379, // Redis port
	host: "127.0.0.1", // Redis host
	password: "",
	db: 0,
	lazyConnect: true,
});

export default tokensBlackListRedisInstance;
