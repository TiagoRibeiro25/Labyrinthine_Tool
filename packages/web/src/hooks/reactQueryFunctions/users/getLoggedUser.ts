import constants from "../../../constants";

export default async (token: string) => {
	const response: Response = await fetch(constants.API_URL + "/users/me", {
		method: "GET",
		headers: {
			Authorization: token,
		},
	});

	return await response.json();
};
