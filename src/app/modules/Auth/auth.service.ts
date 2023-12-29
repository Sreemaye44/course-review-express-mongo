import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import jwt from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
	const userInfo = await User.findOne({ username: payload?.username }); // Assuming 'id' is 'username'

	if (!userInfo) {
		throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
	}

	if (!(await User.isPasswordMatched(payload?.password, userInfo?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    const jwtPayload = {
      _id: userInfo._id,
      role: userInfo.role,
      email: userInfo.email,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string, {expiresIn:'10d'}
  );
  return {userInfo,accessToken}

};
export const AuthServices = {
	loginUser,
};
