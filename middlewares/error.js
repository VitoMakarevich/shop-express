const {errorHandler: {generalErrorHandler}} = require('services');
const generalErrorMiddleware = () => async (error, req, res, next) => {
  const errorForSend = generalErrorHandler(error);

  res
    .status(errorForSend.status)
    .json(errorForSend.message);
};

module.exports = {
  generalErrorMiddleware,
};
