import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { filter } from "../../helpers/filterHelper";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (user: JwtPayload, payload: TCourse) => {
	const { _id } = user;
	const createdBy = _id;
	const result = await Course.create({ ...payload, createdBy });
	return result;
};

const getAllCoursesFromDB = async (payload: any) => {
	const result = await filter(
		Course.find().populate({
			path: "createdBy",
			select: "-passwordChangeHistory", // Exclude the passwordchangeHistory field
		}),
		payload
	);

	return result;
};

const updateCourseintoDB = async (id: string, payload: Partial<TCourse>) => {
	const { details, tags, ...remainingCourseData } = payload;
	const modifiedUpdatedData: Record<string, unknown> = {
		...remainingCourseData,
	};
	if (details && Object.keys(details).length) {
		for (const [key, value] of Object.entries(details)) {
			modifiedUpdatedData[`details.${key}`] = value;
		}
	}
	const updateWithoutTags = await Course.findOneAndUpdate(
		{ id },
		modifiedUpdatedData,
		{
			new: true,
			runValidators: true,
		}
	);

	if (tags && tags.length > 0) {
		//filter out the deleted fields
		const deletedTags = tags
			?.filter((el: any) => el.name && el.isDeleted)
			.map((el) => el.name);

		const deletedTagNames = await Course.findOneAndUpdate(
			{ id },
			{
				$pull: { tags: { name: { $in: deletedTags } } },
			}
		);
		//filter out the new course fields

		const newTags = tags?.filter((el) => el.name && !el.isDeleted);
		const newTagsName = await Course.findOneAndUpdate(
			{ id },
			{
				$addToSet: { tags: { $each: newTags } },
			}
		);

		//   // modifiedUpdatedData["tags"] = tags;
	}

	const result = await Course.findOne({ id }).populate({
		path: "createdBy",
		select: "-passwordChangeHistory", // Exclude the passwordchangeHistory field
	});

	return result;
};

const getSingleCourseFromDB = async (id: string) => {
	const result = await Course.aggregate([
		{ $match: { _id: mongoose.Types.ObjectId.createFromHexString(id) } },
		{
			$lookup: {
				from: "users",
				let: { createdBy: "$createdBy" },
				pipeline: [
					{
						$match: {
							$expr: { $eq: ["$_id", "$$createdBy"] },
						},
					},
					{
						$project: {
							password: 0,
							passwordChangeHistory: 0, // Exclude the password field
							// Include other fields as needed
						},
					},
				],
				as: "createdBy",
			},
		},
		{
			$lookup: {
				from: "reviews",
				localField: "_id",
				foreignField: "courseId",
				as: "reviews",
			},
		},
		{
			$unwind: {
				path: "$reviews",
				preserveNullAndEmptyArrays: true,
			},
		},
		{
			$lookup: {
				from: "users",
				let: { createdByReview: "$reviews.createdBy" },
				pipeline: [
					{
						$match: {
							$expr: { $eq: ["$_id", "$$createdByReview"] },
						},
					},
					{
						$project: {
							password: 0,
							passwordChangeHistory: 0,
							// Exclude the password field
							// Include other fields as needed
						},
					},
				],
				as: "reviews.createdBy",
			},
		},
		{
			$group: {
				_id: "$_id",
				createdBy: { $first: "$createdBy" },
				reviews: { $push: "$reviews" },
				// Include other fields from the original collection if needed
			},
		},
	]);
	return result;
};

const getBestCourseFromDB = async () => {
	const result = await Course.aggregate([
		{
			$lookup: {
				from: "users",
				let: { createdBy: "$createdBy" },
				pipeline: [
					{
						$match: {
							$expr: { $eq: ["$_id", "$$createdBy"] },
						},
					},
					{
						$project: {
							password: 0,
							passwordChangeHistory: 0, // Exclude the password field
							// Include other fields as needed
						},
					},
				],
				as: "createdBy",
			},
		},
		{
			$lookup: {
				from: "reviews",
				localField: "_id",
				foreignField: "courseId",
				as: "reviews",
			},
		},
		{
			$addFields: {
				averageRating: { $avg: "$reviews.rating" },
				reviewCount: { $size: "$reviews" },
			},
		},
		{
			$unset: "reviews",
		},
		{
			$sort: {
				averageRating: -1,
				reviewCount: -1,
			},
		},
		{
			$limit: 1,
		},
	]);
	return result;
};

export const CourseServices = {
	createCourseIntoDB,
	getAllCoursesFromDB,
	updateCourseintoDB,
	getSingleCourseFromDB,
	getBestCourseFromDB,
};
