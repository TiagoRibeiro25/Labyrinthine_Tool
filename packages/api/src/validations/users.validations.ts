export default {
	getUser: {
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

	sendFriendRequest: {
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
