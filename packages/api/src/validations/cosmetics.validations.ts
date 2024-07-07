export default {
	getCosmetic: {
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

	getUserCosmetics: {
		schemas: {
			querystring: {
				type: "object",
				properties: {
					userId: { type: "string" },
					filter: { type: "string", enum: ["unlocked", "locked"] },
				},
				required: ["userId"],
			},
		},
	},

	unlockCosmetic: {
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

	lockCosmetic: {
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
};
