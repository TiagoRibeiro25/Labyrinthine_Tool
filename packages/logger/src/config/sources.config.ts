const sources: Record<string, string> = {};

sources[process.env.API_AUTH_KEY as string] = "API";

export default sources;
