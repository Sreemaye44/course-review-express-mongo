import { Types } from "mongoose";
export type TTags = {
  name: string;
  isDeleted: boolean;
  _id: string;
};
export type TDetails = {
  level: string;
  description: string;
};
export type TCourse = {
  _id: Types.ObjectId;
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: [TTags];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: TDetails;
  createdBy: Types.ObjectId;
};
