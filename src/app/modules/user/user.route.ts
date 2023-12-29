import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidationSchema } from "./user.validation";
import { userControllers } from "./user.controller";
const router = express.Router();
router.post(
  "/auth/register",
  validateRequest(UserValidationSchema.createUserValidationSchema),
  userControllers.createUser
);
// router.get("/courses", reviewControllers.createReview);

export const UserRoutes = router;
