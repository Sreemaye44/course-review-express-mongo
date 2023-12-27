import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorReponse } from "../interface/error";

function transformErrorMessages(errors: any) {
  const errorMessage = errors.map((error: any) => error.message).join(". ");

  return errorMessage;
}

const handleZodError = (err: ZodError): TGenericErrorReponse => {
  const errorMessages: TErrorSource = err.issues.map((issue: ZodIssue) => {
    console.log(issue);
    return {
      message: ` ${issue?.path[issue.path.length - 1]} is required`,
    };
  });

  const errorMessage = transformErrorMessages(errorMessages);

  const statusCode = 400;
  return {
    statusCode,
    message: "validation Error",
    errorMessage,
  };
};

export default handleZodError;
