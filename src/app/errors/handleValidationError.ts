import mongoose from "mongoose";
import { TErrorSource, TGenericErrorReponse } from "../interface/error";
function transformErrorMessages(errors: any) {
  const errorMessage = errors.map((error: any) => error.message).join(". ");

  return errorMessage;
}
const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorReponse => {
  const errorMessages: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      console.log(val);
      return {
        message: val?.message,
      };
    }
  );
  const errorMessage = transformErrorMessages(errorMessages);

  const statusCode = 400;

  return {
    statusCode,
    message: "validation Error",
    errorMessage,
  };
};
export default handleValidationError;
