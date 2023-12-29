import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
	const result = await UserServices.createUsersIntoDB(req.body);
	const { username, email, role, createdAt, updatedAt, _id } = result.toJSON();
	const user = {
		_id,
		username,
		email,
		role,
		createdAt,
		updatedAt,
	};

	//send response
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "User registered successfully",
		data: user,
	});
});

export const userControllers = {
	createUser,
};
