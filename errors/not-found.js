/**
 * Represents not found error.
 */
function NotFoundError(...args) {
  this.code = 603;
  Error.call(this, ...args);
  Error.captureStackTrace(this, NotFoundError);
}

NotFoundError.prototype = Error;

module.exports = NotFoundError;
