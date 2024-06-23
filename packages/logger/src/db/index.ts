import mongoose, { Mongoose } from "mongoose";
import config from "../config";
import models from "../models"; // Adjust the path as necessary

export default {
	mongoose,
	connect: (): Promise<Mongoose> => {
		return mongoose.connect(process.env.DATABASE_URL as string, config.mongoose);
	},
	disconnect: (): Promise<void> => {
		return mongoose.disconnect();
	},
	event: models.Event,
};
