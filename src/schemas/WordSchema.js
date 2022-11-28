import mongoose from "mongoose";
const { Schema } = mongoose;

export const WordSchema = new Schema(
  {
    word: String,
    definition: String,
  },
  { collection: "words" }
);

// add text indexes to enable searching on mongo
WordSchema.index({ word: "text", definition: "text" });
