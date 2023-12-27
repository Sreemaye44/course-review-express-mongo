import * as z from "zod";

// Define a Zod schema for the review object
const createReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string(), // Assuming courseId is a string type
    rating: z.number().min(1).max(5),
    review: z.string(),
  }),
});
const updateReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string().optional(), // Assuming courseId is a string type
    rating: z.number().min(1).max(5).optional(),
    review: z.string().optional(),
  }),
});

export const ReviewValidationSchema = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
