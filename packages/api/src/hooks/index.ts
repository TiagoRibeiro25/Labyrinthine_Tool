import handleAdminValidation from "./handleAdminValidation.hooks";
import handleAuthToken from "./handleAuthToken.hooks";
import handleError from "./handleError.hook";

export default {
	preValidation: {
		handleAuthToken,
	},
	preHandler: {
		handleAdminValidation,
	},

	onError: {
		handleError,
	},
};
