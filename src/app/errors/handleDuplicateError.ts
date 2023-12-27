import { TErrorSource, TGenericErrorReponse } from "../interface/error";

const handleDuplicateError = (err: any): any => {
  // const match = err.message.match(/"([^"]*)"/);
  // const extractedMessage = match && match[1];

  // const errorMessages: string = [
  //   {
  //     message: `${err.keyValue.title}  is already exists`,
  //   },
  // ];
  const errorMessage: string = `${err.keyValue.title}  is already exists`;
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid id",
    errorMessage,
  };
};

export default handleDuplicateError;
