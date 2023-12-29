import { Model } from "mongoose";

export type TUser = {
    username: string;
    email: string;
    password: string;
    role: string;
};
export interface UserModel extends Model<TUser>{
    isPasswordMatched(plainTextPassword:string, hashedPassword: string):Promise<boolean>
}
