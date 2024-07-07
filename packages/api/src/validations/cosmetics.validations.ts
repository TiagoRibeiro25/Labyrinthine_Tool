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
};
