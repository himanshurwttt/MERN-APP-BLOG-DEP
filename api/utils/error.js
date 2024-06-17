const errorHandler = (statusCode, errorMessage) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.errorMessage = errorMessage;
};
export default errorHandler;
