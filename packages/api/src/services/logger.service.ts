import axios from "axios";
import constants from "../constants";

const options = {
	baseUrl: constants.ENV.LOGGER_API_URL,
	authKey: constants.ENV.LOGGER_API_AUTH_KEY,
};

type Params = {
	type: "info" | "warning" | "error";
	message: string;
	data?: any;
};

/**
 * Logger service for logging events.
 */
export default {
	/**
	 * Logs an event.
	 * @param params - The parameters for the event.
	 * @returns A Promise that resolves when the event is logged.
	 * IT DOES NOT THROW AN ERROR.
	 */
	log: async (params: Params): Promise<void> => {
		try {
			const requestBody: Params = {
				type: params.type,
				message: `[${constants.ENV.NODE_ENV}]: ${params.message}`,
			};

			if (params.data) {
				requestBody.data = params.data;
			}

			await axios.post(options.baseUrl + "/events", requestBody, {
				headers: { Authorization: options.authKey },
			});
		} catch (_error) {
			console.log("An error occurred while logging the event");
			console.log("Event data: ", params);
		}
	},
};
