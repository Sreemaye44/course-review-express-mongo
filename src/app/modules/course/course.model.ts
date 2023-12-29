import { Schema, model } from "mongoose";
import { TCourse, TDetails, TTags } from "./course.interface";

// Define the schema for Tags
const tagsSchema = new Schema<TTags>(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { _id: false }
);

// Define the schema for Details
const detailsSchema = new Schema<TDetails>(
  {
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    description: { type: String, required: true },
  },
  { _id: false }
);

// Define the schema for Course
const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "CategoryId" },
    price: { type: Number, required: true },
    tags: [tagsSchema], // Array of tags based on the previously defined schema
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: detailsSchema, // Details object based on the previously defined schema
  },
  {timestamps: true, versionKey: false }
);

courseSchema.pre("save", async function (next) {
  const course = this;
  const start: any = new Date(course.startDate);
  const end: any = new Date(course.endDate);
  const differenceInMs = end - start;

  // Convert milliseconds to weeks (assuming 1 week = 7 days = 604800000 milliseconds)
  const durationInWeeks = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24 * 7));
  course.durationInWeeks = durationInWeeks;
});

// Create a Mongoose model based on the schema
export const Course = model<TCourse>("Course", courseSchema);
