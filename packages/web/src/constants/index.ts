import routes from "./routes";

export default {
	STEAM_BUY_URL: "https://store.steampowered.com/app/1302240/Labyrinthine/",
	SUMMER_EVENT_ANNOUNCEMENT_URL:
		"https://store.steampowered.com/news/app/1302240/view/4141701971813405619",
	GAME_TAILER_URL:
		"https://cdn.akamai.steamstatic.com/steam/apps/256962951/movie480_vp9.webm?t=1691679856",
	OFFICIAL_DISCORD_INVITE_URL: "https://discord.gg/RfzqA4A",

	ROUTES: routes,

	WARNINGS: {
		MILLISECONDS_BEFORE_REMOVAL: 5000,
	},

	LOCAL_STORAGE_KEYS: {
		AUTH_TOKEN: "authToken",
	},

	// TODO: Change this to an environment variable
	API_URL: "http://localhost:5000/api/v1",
};
