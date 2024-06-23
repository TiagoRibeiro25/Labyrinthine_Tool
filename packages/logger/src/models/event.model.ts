import mongoose, { Document, Schema } from "mongoose";

interface IEvent extends Document {
	service: string;
	type: "info" | "warning" | "error";
	message: string;
	data: any; // This can be any type that represents JSON data
	createdAt: Date;
	updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
	service: { type: String, required: true },
	type: { type: String, enum: ["info", "warning", "error"], required: true },
	message: { type: String, required: true },
	data: { type: Schema.Types.Mixed }, // Store JSON data as Mixed type
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

EventSchema.pre<IEvent>("save", function (next) {
	if (this.isModified()) {
		this.updatedAt = new Date();
	}

	next();
});

// Define the Mongoose model
const Event = mongoose.model<IEvent>("Event", EventSchema);

export default Event;
