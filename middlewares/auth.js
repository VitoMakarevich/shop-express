const {auth: authService} = require('services');
const {AccessDeniedError} = require('errors');

const checkAuth = () => {
  return async (req, res, next) => {
    const sessionId = req.cookie.session;
    const session = await authService.checkAuth(sessionId);
    if (session) {
next();
} else {
next(new AccessDeniedError);
}
  };
};

module.exports = {
  checkAuth,
};
