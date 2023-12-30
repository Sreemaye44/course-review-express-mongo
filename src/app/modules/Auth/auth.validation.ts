import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "user name is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: "current password is required",
    }),
    newPassword: z.string()
			.min(8)
			.refine((password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password), {
				message: 'Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*).'})
  }),
});

// const refreshTokenValidationSchema = z.object({
//   cookies: z.object({
//     refreshToken: z.string({
//       required_error: 'Refresh token is required!',
//     }),
//   }),
// });

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  // refreshTokenValidationSchema,
};
