import mongoose from "mongoose";
import { TErrorSource, TGenericErrorReponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorReponse => {
  const errorMessage: TErrorSource = [
    {
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid ID",
    errorMessage,
  };
};
export default handleCastError;
