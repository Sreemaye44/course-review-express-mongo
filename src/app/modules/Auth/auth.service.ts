import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';

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

const changePassword = async (user: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {
  console.log(user)
  const userInfo = await User.findOne({ _id: user._id }); 

	if (!userInfo) {
		throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
	}

	if (!(await User.isPasswordMatched(payload.oldPassword, userInfo?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const newHashedPassword=await bcrypt.hash(payload.newPassword, Number(config.salt_rounds))
  await User.findOneAndUpdate({ id: user.userId, role: user.role }, {
    password: newHashedPassword,
    passwordChangeAt: new Date()
  });
  return null;
}
export const AuthServices = {
  loginUser,
  changePassword
};
