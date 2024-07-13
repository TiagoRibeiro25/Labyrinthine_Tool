export default {
	getSteamLinkUsername: (link: string): string | null => {
		if (
			!link.includes("https://steamcommunity.com/id/") &&
			!link.includes("https://steamcommunity.com/profiles/")
		) {
			return null;
		}

		const linkWithoutHttp = link.replace("https://", "").replace("http://", "");
		const username = linkWithoutHttp.split("/")[2];

		return isNaN(Number(username)) ? username : null;
	},
};
