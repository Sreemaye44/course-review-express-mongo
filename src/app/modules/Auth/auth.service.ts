import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
	const userInfo = await User.findOne({ username: payload?.username }).select(
		"+password"
	); // Assuming 'id' is 'username'
	if (!userInfo) {
		throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
	}

	if (!(await User.isPasswordMatched(payload?.password, userInfo?.password)))
		throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

	const jwtPayload = {
		_id: userInfo._id,
		role: userInfo.role,
		email: userInfo.email,
	};

	const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
		expiresIn: "10d",
	});
	return { userInfo, token };
};

const changePassword = async (
	user: JwtPayload,
	payload: { currentPassword: string; newPassword: string }
) => {
	const userInfo = await User.findOne({ _id: user._id }).select("+password");

	if (!userInfo) {
		throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
	}

	if (
		!(await User.isPasswordMatched(payload.currentPassword, userInfo?.password))
	)
		throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

	const newPasswordMatches = userInfo.passwordChangeHistory
		.slice(0, 2)
		.some(
			(prevPassword) =>
				bcrypt.compareSync(payload.newPassword, prevPassword.password) ||
				bcrypt.compareSync(payload.newPassword, userInfo.password)
		);

	if (newPasswordMatches) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"Password change failed. Ensure the new password is unique and not among the last 2 used"
		);
	}

	const newHashedPassword = await bcrypt.hash(
		payload.newPassword,
		Number(config.salt_rounds)
	);

	userInfo.passwordChangeHistory.unshift({
		password: userInfo.password,
		createdAt: new Date(),
	});

	if (userInfo.passwordChangeHistory.length > 2) {
		userInfo.passwordChangeHistory.pop();
	}

	const result = await User.findOneAndUpdate(
		{ id: user.userId, role: user.role },
		{
			password: newHashedPassword,
			passwordChangeHistory: userInfo.passwordChangeHistory,
		}
	).select("-passwordChangeHistory");
	return result;
};
export const AuthServices = {
	loginUser,
	changePassword,
};
