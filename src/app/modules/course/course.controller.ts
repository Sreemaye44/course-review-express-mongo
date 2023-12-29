import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
 const createdBy = req.user._id;
  const result = await CourseServices.createCourseIntoDB(req.body);
  const modifiedResult = {
    ...result.toObject(), // Convert Mongoose document to plain object
    createdBy, // Add the createdAt field
  };
  //send response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Course created successfully",
    data: modifiedResult,
  });
});

const getAllCourses = catchAsync(async (req, res, next) => {
  console.log(req.user)
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses retrieved successfully",
    meta: {
      page: result.meta.page,
      limit: result.meta.limit,
      total: result.data.length,
    },
    data: result.data,
  });
});
const updateCourse = catchAsync(async (req, res, next) => {
  const { CourseId } = req.params;

  const result = await CourseServices.updateCourseintoDB(CourseId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is updated successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course and Reviews retrieved succesfully",
    data: result,
  });
});
const getBestCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Best course retrieved successfully",
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourses,
  updateCourse,
  getSingleCourse,
  getBestCourse,
};
