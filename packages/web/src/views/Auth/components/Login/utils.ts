import { ErrorResponseBodyData } from "../../../../types";

// result must have at least one of the fields
type Result = {
	username?: string;
	password?: string;
};

export default {
	handleResponseErrorData: (bodyData: ErrorResponseBodyData): Result => {
		if (bodyData.message.startsWith("body/password")) {
			// Cut the "body/password" part of the message and replace it with "Password"
			return { password: "Password " + bodyData.message.split(" ").slice(1).join(" ") };
		} else if (bodyData.message.startsWith("body/username")) {
			// Cut the "body/username" part of the message and replace it with "Username"
			return { username: "Username " + bodyData.message.split(" ").slice(1).join(" ") };
		} else if (bodyData.message === "Username can only contain letters, numbers and underscores") {
			return { username: bodyData.message };
		} else if (bodyData.message === "There's no user with that username") {
			return { username: bodyData.message };
		} else if (bodyData.message === "Invalid credentials") {
			return { password: bodyData.message };
		} else if (bodyData.statusCode === 400) {
			return { username: "Invalid username", password: "Invalid password" };
		}

		return {
			username: "An error occurred",
			password: "An error occurred",
		};
	},
};
