import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import jwt from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
	const user = await User.findOne({ username: payload?.username }); // Assuming 'id' is 'username'

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
	}

	if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    const jwtPayload = {
      userId: user._id,
      role: user.role,
      email: user.email,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string, {expiresIn:'10d'}
  );
  return {accessToken}

};
export const AuthServices = {
	loginUser,
};
