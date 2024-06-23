import axios from "axios";

const options = {
	baseUrl: process.env.LOGGER_API_URL as string,
	authKey: process.env.LOGGER_API_AUTH_KEY as string,
};

type Params = {
	type: "info" | "warning" | "error";
	message: string;
	data: any;
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
			await axios.post(
				options.baseUrl + "/events",
				{
					type: params.type,
					message: `[${process.env.NODE_ENV}]: ${params.message}`,
					data: params.data,
				},
				{ headers: { Authorization: options.authKey } }
			);
		} catch (_error) {
			console.log("An error occurred while logging the event");
			console.log("Event data: ", params);
		}
	},
};
