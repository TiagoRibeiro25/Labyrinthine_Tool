import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import constants from "../constants";

const axiosOptions: CreateAxiosDefaults = {
	baseURL: constants.API_URL, // Base URL for all requests
	headers: { "Content-Type": "application/json" }, // Default header for all requests
	timeout: 60000, // 1 minute
	timeoutErrorMessage: "Request timed out", // Error message when request times out
};

const api: AxiosInstance = axios.create(axiosOptions);

export default api;
