import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidationSchema } from "./review.validation";
import { reviewControllers } from "./review.controller";

const router = express.Router();
router.post(
  "/reviews",
  validateRequest(ReviewValidationSchema.createReviewValidationSchema),
  reviewControllers.createReview
);
// router.get("/courses", reviewControllers.createReview);

export const ReviewRoutes = router;












