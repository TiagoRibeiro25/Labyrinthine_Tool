export default {
	logEvent: {
		schemas: {
			// Authorization header validation
			headers: {
				type: "object",
				required: ["authorization"],
				properties: {
					authorization: { type: "string", enum: [process.env.API_AUTH_KEY] },
				},
			},

			// Request body schema validation
			body: {
				type: "object",
				required: ["type", "message"],
				properties: {
					type: { type: "string", enum: ["info", "warning", "error"] },
					message: { type: "string" },
					data: { type: "object", default: {} }, // Optional
				},
			},
		},
	},
};
