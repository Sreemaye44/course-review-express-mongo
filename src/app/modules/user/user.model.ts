import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

import config from "../../config";
import { TUser, UserModel } from "./user.interface";

const userSchema = new Schema<TUser, UserModel>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			match: /^\S+@\S+\.\S+$/,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			validate: {
				validator: (value: string) => {
					// Example password strength validation (customizable)
					return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(
						value
					);
				},
				message:
					"Password should contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.",
			},
			select: 0,
		},
		passwordChangeHistory: [
			{
				password: String,
				// Hashed password
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],

		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
	},
	{ timestamps: true, versionKey: false }
);
userSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));

	next();
});

userSchema.statics.isPasswordMatched = async function (
	plainTextPassword,
	hashedPassword
) {
	return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
