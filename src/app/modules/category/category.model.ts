import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

export const Category = model<TCategory>("categories", categorySchema);
