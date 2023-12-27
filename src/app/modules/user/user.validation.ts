import * as z from "zod";

// Define a Zod schema for the review object
const createUserValidationSchema = z.object({
	body: z.object({
		username: z.string(), // Example: Minimum length of 3 characters for username
		email: z.string().email(), // Validates if the email format is correct
		password: z
			.string()
			.min(8)
			.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/), // Password strength validation
		role: z.enum(["user", "admin"]).default("user"),
	}),
});

export const ReviewValidationSchema = {
	createUserValidationSchema,
};
