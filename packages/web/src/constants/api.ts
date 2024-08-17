import { HTTPMethod } from "../types";

export default {
	URL: import.meta.env.VITE_API_URL,

	ROUTES: {
		AUTH: {
			LOGIN: {
				ENDPOINT: "/auth/login",
				METHOD: "post" as HTTPMethod,
			},
			LOGOUT: {
				ENDPOINT: "/auth/logout",
				METHOD: "delete" as HTTPMethod,
			},
		},

		USERS: {
			GET_LOGGED_USER: {
				ENDPOINT: "/users/me",
				METHOD: "get" as HTTPMethod,
			},
			GET_USER: {
				ENDPOINT: "/users/:userId",
				METHOD: "get" as HTTPMethod,
			},
			SEND_REQUEST: {
				ENDPOINT: "/users/:userId/friends",
				METHOD: "post" as HTTPMethod,
			},
			REMOVE_FRIEND: {
				ENDPOINT: "/users/:userId/friends",
				METHOD: "delete" as HTTPMethod,
			},
			ACCEPT_REQUEST: {
				ENDPOINT: "/users/:userId/friends",
				METHOD: "patch" as HTTPMethod,
			},
		},
	},
};
