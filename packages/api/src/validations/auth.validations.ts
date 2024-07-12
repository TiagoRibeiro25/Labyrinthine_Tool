export default {
	register: {
		schemas: {
			body: {
				type: "object",
				required: ["username", "password"],
				properties: {
					username: {
						type: "string",
						minLength: 3,
						maxLength: 20,
					},
					password: {
						type: "string",
						minLength: 8,
						maxLength: 255,
					},
					discordUsername: {
						type: "string",
						minLength: 3,
						maxLength: 30,
					},
					steamProfileUrl: {
						type: "string",
						minLength: 3,
						maxLength: 255,
					},
				},
			},
		},
	},

	login: {
		schemas: {
			body: {
				type: "object",
				required: ["username", "password"],
				properties: {
					username: {
						type: "string",
						minLength: 3,
						maxLength: 20,
					},
					password: {
						type: "string",
						minLength: 8,
						maxLength: 255,
					},
				},
			},
		},
	},
};
