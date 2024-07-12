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
		EDIT_PROFILE: USER_PREFIX + "/me/edit",
	},
};
