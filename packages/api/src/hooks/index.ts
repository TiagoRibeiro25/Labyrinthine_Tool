import handleAdminValidation from "./handleAdminValidation.hooks";
import handleAuthToken from "./handleAuthToken.hooks";
import handleInternalError from "./handleInternalError.hooks";

export default {
	preValidation: {
		handleAuthToken,
	},
	preHandler: {
		handleAdminValidation,
	},

	onError: {
		handleInternalError,
	},
};
