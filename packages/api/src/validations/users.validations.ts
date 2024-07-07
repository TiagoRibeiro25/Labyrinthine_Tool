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

	removeFriend: {
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

	getUserFriends: {
		schemas: {
			params: {
				type: "object",
				properties: {
					userId: { type: "string" },
				},
				required: ["userId"],
			},
			query: {
				type: "object",
				properties: {
					page: { type: "number" },
					limit: { type: "number" },
				},
			},
		},
	},
};
