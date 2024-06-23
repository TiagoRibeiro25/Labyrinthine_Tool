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
						maxLength: 255,
					},
					password: {
						type: "string",
						minLength: 8,
						maxLength: 255,
					},
					discordUsername: {
						type: "string",
						minLength: 3,
						maxLength: 255,
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
};
