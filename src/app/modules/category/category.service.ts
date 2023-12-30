import { JwtPayload } from "jsonwebtoken";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB = async (user: JwtPayload, payload: TCategory) => {
	const { _id } = user;
	const createdBy = _id;
	const result = await Category.create({ ...payload, createdBy });
	return result;
};
const getAllCategoriesFromDB = async () => {
	const result = await Category.find().populate({
		path: "createdBy",
		select: "-passwordChangeHistory", // Exclude the passwordchangeHistory field
	});
	return result;
};
export const CategoryServices = {
	createCategoryIntoDB,
	getAllCategoriesFromDB,
};
