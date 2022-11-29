import dotenv from "dotenv";

// import environment variables
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
};
