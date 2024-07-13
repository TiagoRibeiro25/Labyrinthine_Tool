export default {
	addCosmetic: {
		schemas: {
			body: {
				type: "object",
				required: ["name", "type", "source"],
				properties: {
					name: {
						type: "string",
						minLength: 1,
						maxLength: 255,
					},
					type: {
						type: "string",
						enum: [
							"disc",
							"hat",
							"clothing",
							"wrist",
							"flashlight",
							"lantern",
							"glowstick",
							"face",
						],
					},
					source: {
						type: "string",
						minLength: 3,
						maxLength: 255,
					},
					notes: {
						type: "string",
						minLength: 5,
						maxLength: 255,
					},
				},
			},
		},
	},

	deleteCosmetic: {
		schemas: {
			params: {
				type: "object",
				properties: {
					cosmeticId: { type: "string" },
				},
				required: ["cosmeticId"],
			},
		},
	},

	toggleUserAdminStatus: {
		schemas: {
			params: {
				type: "object",
				properties: {
					userId: { type: "string" },
				},
				required: ["userId"],
			},
		},
	},

	removeUser: {
		schemas: {
			params: {
				type: "object",
				properties: {
					userId: { type: "string" },
				},
				required: ["userId"],
			},
		},
	},
};
