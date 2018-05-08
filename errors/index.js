const ValidationError = require('./validation');
const NotFoundError = require('./not-found');
const AccessDeniedError = require('./access-denied');
const CustomError = require('./custom');

module.exports = {
  CustomError,
  ValidationError,
  NotFoundError,
  AccessDeniedError,
};
