import mongoose from "mongoose";

import { WordSchema } from "../schemas/WordSchema.js";

export const WordModel = mongoose.model("Word", WordSchema, "words");
