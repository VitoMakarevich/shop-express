/**
 * Represents validation error.
 */
function ValidationError(...args) {
  this.code = 400;
  Error.call(this, ...args);
  Error.captureStackTrace(this, ValidationError);
}

ValidationError.prototype = Error;

module.exports = ValidationError;
