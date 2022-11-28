import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { webRouter } from "./routes/index.js";
import { connectDB } from "./db/connectDb.js";

const app = express();
dotenv.config();

// connect to database
connectDB();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/v1/health", (_req, res) => res.send("Server is running"));

// set up routes
app.use("/api/v1", webRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
