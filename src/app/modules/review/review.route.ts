import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidationSchema } from "./review.validation";
import { reviewControllers } from "./review.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();
router.post(
  "/reviews",auth(USER_ROLE.user),
  validateRequest(ReviewValidationSchema.createReviewValidationSchema),
  reviewControllers.createReview
);
// router.get("/courses", reviewControllers.createReview);

export const ReviewRoutes = router;












