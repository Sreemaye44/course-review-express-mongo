import { z } from "zod";

const createCategorySchemaValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    }),
    createdBy: z.string().optional(),
  }),
});
export const categorySchemaValidation = {
  createCategorySchemaValidation,
};
