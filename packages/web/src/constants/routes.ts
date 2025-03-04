const AUTH_PREFIX = "/auth";
const USER_PREFIX = "/user";

export default {
	HOME: "/",
	NOT_FOUND: "/404",

	AUTH: {
		PREFIX: AUTH_PREFIX,
		LOGIN: AUTH_PREFIX + "/login",
		SIGNUP: AUTH_PREFIX + "/create-account",
	},

	USER: {
		PREFIX: USER_PREFIX,
		PROFILE: USER_PREFIX + "/:id",
		OWN_PROFILE: USER_PREFIX + "/me",
		EDIT_PROFILE: USER_PREFIX + "/me/edit",
		FRIENDS: USER_PREFIX + "/:id/friends",
		COSMETICS: USER_PREFIX + "/:id/cosmetics",
	},

	COSMETIC: {
		PREFIX: "/cosmetic",
		ITEM: "/cosmetic/:id",
	},
};
