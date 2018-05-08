const generalErrorHandler = (error) => {
  const internalServerErrorCode = 500;
  const errorForSend = {
    status: error.code || internalServerErrorCode,
    message: error.message
  }

  return errorForSend;
};

module.exports = {
  generalErrorHandler
}