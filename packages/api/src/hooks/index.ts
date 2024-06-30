import handleAdminValidation from "./handleAdminValidation.hooks";
import handleAuthToken from "./handleAuthToken.hooks";

export default {
	preValidation: {
		handleAuthToken,
	},
	preHandler: {
		handleAdminValidation,
	},
};
