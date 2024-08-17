export default {
	URL: import.meta.env.VITE_API_URL,

	ROUTES: {
		AUTH: {
			LOGIN: {
				ENDPOINT: "/auth/login",
				METHOD: "post",
			},
			LOGOUT: {
				ENDPOINT: "/auth/logout",
				METHOD: "delete",
			},
		},

		USERS: {
			GET_LOGGED_USER: {
				ENDPOINT: "/users/me",
				METHOD: "get",
			},
		},
	},
};
