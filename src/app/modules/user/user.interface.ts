import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
    username: string;
    email: string;
    password: string;
    passwordChangeAt?: Date;
    role: string;
};
export interface UserModel extends Model<TUser>{
    isPasswordMatched(plainTextPassword:string, hashedPassword: string):Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLE;
