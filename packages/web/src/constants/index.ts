import api from "./api";
import cosmetics from "./cosmetics";
import profilePictures from "./profilePictures";
import routes from "./routes";

export default {
	STEAM_BUY_URL: "https://store.steampowered.com/app/1302240/Labyrinthine/",
	SUMMER_EVENT_ANNOUNCEMENT_URL:
		"https://store.steampowered.com/news/app/1302240/view/4141701971813405619",
	GAME_TAILER_URL:
		"https://cdn.akamai.steamstatic.com/steam/apps/256962951/movie480_vp9.webm?t=1691679856",
	OFFICIAL_DISCORD_INVITE_URL: "https://discord.gg/RfzqA4A",

	ROUTES: routes,
	COSMETICS_PICTURES: cosmetics,
	PROFILE_PICTURES: profilePictures,

	WARNINGS: {
		MILLISECONDS_BEFORE_REMOVAL: 5000,
	},

	LOCAL_STORAGE_KEYS: {
		AUTH_TOKEN: "authToken",
	},

	SESSION_STORAGE_KEYS: {
		WHY_SHOULD_YOU_USE_ARROW_POSITION: "whyShouldYouUseArrowPosition",
		AUTH_TOKEN: "authToken",
	},

	API: api,
};
