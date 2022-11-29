import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import { webRouter } from "./src/routes/index.js";
import { connectDB } from "./src/db/connectDb.js";
import { ENV } from "./src/config/environment.js";
import { Logger } from "./src/lib/classes/Logger.js";

const app = express();

// connect to database
connectDB();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up routes
app.use("/api/v1", webRouter);

app.get("/", (req, res) => res.send("App is running"));

// global error handler
process.on("uncaughtException", (err) => Logger.logFullError(err));

app.listen(ENV.PORT, () =>
  Logger.info(`Server is running on port ${ENV.PORT}`)
);
