import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB = async (user: JwtPayload, payload: TReview) => {
  const { _id } = user;
  const createdBy = _id;
  const result = (await Review.create({ ...payload, createdBy })).populate(
    "createdBy"
  );
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
