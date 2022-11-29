import mongoose from "mongoose";
import { Logger } from "../lib/classes/Logger.js";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => Logger.info("Database connected"))
    .catch(() => Logger.error("Database connection error"));
};
