import * as z from "zod";

// Define a Zod schema for the review object
const createUserValidationSchema = z.object({
	body: z.object({
		username: z.string(), // Example: Minimum length of 3 characters for username
		email: z.string().email(), // Validates if the email format is correct
		password: z
			.string()
			.min(8)
			.refine((password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password), {
				message: 'Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*).'}),
		role: z.enum(["user", "admin"]).default("user"),
	}),
});

export const UserValidationSchema = {
	createUserValidationSchema,
};
