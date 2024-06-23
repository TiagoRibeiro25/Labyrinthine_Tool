//TODO: Increase these values for production

export default {
	logger: true,
	bodyLimit: 1048576, // 1 MiB
	caseSensitive: true,
	requestTimeout: 10000, // 10 seconds
	connectionTimeout: 10000, // 10 seconds
	keepAliveTimeout: 60000, // 60 seconds
	pluginTimeout: 10000, // 10 seconds
	ignoreTrailingSlash: true,
};
