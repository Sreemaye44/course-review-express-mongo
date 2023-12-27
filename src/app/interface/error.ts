export type TErrorSource = {
  message: string;
}[];
export type TGenericErrorReponse = {
  statusCode: number;
  message: string;
  errorMessage: TErrorSource;
};
