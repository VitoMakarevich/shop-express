/**
 * Represents access denied error.
 */
function CustomError(...args) {
  this.code = 512;
  Error.call(this, ...args);
  Error.captureStackTrace(this, CustomError);
}

CustomError.prototype = Error;

module.exports = CustomError;
