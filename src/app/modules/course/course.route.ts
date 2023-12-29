import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseSchemaValidation } from "./course.validation";
import { courseControllers } from "./course.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();
router.post(
  "/course", auth(USER_ROLE.admin),
  validateRequest(CourseSchemaValidation.createCourseSchemaValidation),
  courseControllers.createCourse
);
router.get("/courses",auth(), courseControllers.getAllCourses);
router.get("/courses/:courseId/reviews", courseControllers.getSingleCourse);
router.get("/course/best", courseControllers.getBestCourse);
router.put(
  "/courses/:courseId",
  validateRequest(CourseSchemaValidation.updateCourseSchemaValidation),
  courseControllers.updateCourse
);

export const CourseRoutes = router;
