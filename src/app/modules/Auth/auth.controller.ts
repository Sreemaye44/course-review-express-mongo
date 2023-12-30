import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { userInfo, token } = result;
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
    message: "User log in succesfully!",
    data: { user, token },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password is updated succesfully!",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  // refreshToken,
};
