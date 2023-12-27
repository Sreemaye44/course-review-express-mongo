import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { categorySchemaValidation } from "./category.validation";
import { categoryControllers } from "./category.controller";
const router = express.Router();
router.post(
  "/categories",
  validateRequest(categorySchemaValidation.createCategorySchemaValidation),
  categoryControllers.createCategory
);
router.get("/categories", categoryControllers.getAllCategory);
export const CategoryRoutes = router;
