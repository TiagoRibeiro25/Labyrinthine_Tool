import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import constants from "../constants";
import useAuthStore from "../stores/auth";

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

api.interceptors.response.use((response) => {
	if (response.headers.authorization) {
		const authToken = response.headers.authorization;
		useAuthStore.getState().setAuthToken(authToken);
	}

	return response;
});

export default api;
