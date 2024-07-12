import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import constants from "../constants";
import useAuthStore from "../stores/auth";
import useWarningStore from "../stores/warning";

const axiosOptions: CreateAxiosDefaults = {
	baseURL: constants.API_URL, // Base URL for all requests
	headers: { "Content-Type": "application/json" }, // Default header for all requests
	timeout: 60000, // 1 minute
	timeoutErrorMessage: "Request timed out", // Error message when request times out
};

const api: AxiosInstance = axios.create(axiosOptions);

api.interceptors.request.use((request) => {
	const authToken = useAuthStore.getState().authToken;
	if (authToken) {
		request.headers.Authorization = authToken;
	}

	return request;
});

api.interceptors.response.use(
	async (response) => {
		// Check if the response has a new auth token
		const refreshedAuthToken = response.headers.authorization as string | undefined;
		if (refreshedAuthToken) {
			// If it does, update the auth token in the store
			useAuthStore.getState().setAuthToken(refreshedAuthToken);
		}

		//DEBUG: Add a delay of 1.5 second to all requests
		await new Promise((resolve) => setTimeout(resolve, 1500));

		return response;
	},
	(error) => {
		const addWarning = useWarningStore.getState().addWarning;

		if (error.response.data.message === "You are temporarily blocked from accessing this route.") {
			addWarning(
				"You are temporarily blocked from performing this action. Please try again later.",
				"warning"
			);
		}

		// Check if the error was a server error
		if (error.response.status >= 500) {
			addWarning("An error occurred on the server. Please try again later.", "error");
		}

		return Promise.reject(error);
	}
);

export default api;
