import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";
interface PasswordChange {
  password: string; // Hashed password
  createdAt: Date;
}

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: string;
  passwordChangeHistory: PasswordChange[];
};
export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
