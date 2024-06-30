import adminListRedisInstance from "./adminListRedis.db";
import main from "./main.db";
import suspectIpsRedisInstance from "./suspectIpsRedis.db";
import tokensBlackListRedis from "./tokensBlackListRedis.db";

export default {
	main,
	tokensBlackListRedis,
	suspectIpsRedisInstance,
	adminListRedisInstance,

	connectAllDatabases: (): Promise<void[]> => {
		return Promise.all([
			main.$connect(),
			tokensBlackListRedis.connect(),
			suspectIpsRedisInstance.connect(),
			adminListRedisInstance.connect(),
		]);
	},

	disconnectAllDatabases: (): void => {
		const disconnectPromises = [
			main.$disconnect,
			tokensBlackListRedis.disconnect,
			suspectIpsRedisInstance.disconnect,
			adminListRedisInstance.disconnect,
		];

		for (const promise of disconnectPromises) {
			try {
				promise();
			} catch (_error) {}
		}
	},
};
