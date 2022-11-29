import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import { webRouter } from "./routes/index.js";
import { connectDB } from "./db/connectDb.js";
import { ENV } from "./config/environment.js";
import { Logger } from "./lib/classes/Logger.js";

const app = express();

// connect to database
connectDB();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up routes
app.use("/api/v1", webRouter);

app.listen(ENV.PORT, () =>
  Logger.info(`Server is running on port ${ENV.PORT}`)
);
