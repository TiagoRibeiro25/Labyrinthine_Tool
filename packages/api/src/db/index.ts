import main from "./main.db";
import suspectIpsRedisInstance from "./suspectIpsRedis.db";
import tokensBlackListRedis from "./tokensBlackListRedis.db";

export default {
	main,
	tokensBlackListRedis,
	suspectIpsRedisInstance,

	connectAllDatabases: (): Promise<void[]> => {
		return Promise.all([
			main.$connect(),
			tokensBlackListRedis.connect(),
			suspectIpsRedisInstance.connect(),
		]);
	},
};
