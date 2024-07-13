import constants from "../constants";

export default {
	getProfilePicture: (id?: string): string => {
		const defaultPicture = constants.PROFILE_PICTURES["default"];

		if (!id) {
			return defaultPicture;
		}

		return constants.PROFILE_PICTURES[id] || defaultPicture;
	},

	getCosmeticPicture: (id?: string, type: "default" | "inGame" = "default"): string => {
		const defaultPicture = constants.COSMETICS_PICTURES["default"].picture;

		if (!id) {
			return defaultPicture;
		}

		return (
			constants.COSMETICS_PICTURES[id][type === "default" ? "picture" : "inGamePicture"] ||
			defaultPicture
		);
	},
};
