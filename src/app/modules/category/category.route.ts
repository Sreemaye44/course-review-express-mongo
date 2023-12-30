import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { categorySchemaValidation } from "./category.validation";
import { categoryControllers } from "./category.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();
router.post(
  "/categories",auth(USER_ROLE.admin),
  validateRequest(categorySchemaValidation.createCategorySchemaValidation),
  categoryControllers.createCategory
);
router.get("/categories", categoryControllers.getAllCategory);
export const CategoryRoutes = router;
