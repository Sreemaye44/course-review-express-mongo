import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema <TUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
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
      validator: (value) => {
        // Example password strength validation (customizable)
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value);
      },
      message: 'Password should contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.'
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

export const User = model<TUser>("User", userSchema);

