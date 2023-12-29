import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
	const result = await AuthServices.loginUser(req.body);
	const { userInfo, accessToken } = result;
	const { _id, username, email, role } = userInfo;
	const user = {
		_id,
		username,
		email,
		role,
	};

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User is logged in succesfully!",
		data: { user, accessToken },
	});
});

export const AuthControllers = {
	loginUser,
	// changePassword,
	// refreshToken,
};
