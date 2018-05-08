/**
 * Represents access denied error.
 */
function AccessDeniedError(...args) {
  this.code = 603;
  Error.call(this, ...args);
  Error.captureStackTrace(this, AccessDeniedError);
}

AccessDeniedError.prototype = Error;

module.exports = AccessDeniedError;
