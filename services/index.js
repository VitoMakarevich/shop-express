const user = require('./user');
const errorHandler = require('./error-handler');
const auth = require('./auth');

module.exports = {
  auth,
  errorHandler,
  user,
};
