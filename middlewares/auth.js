const {auth: authService} = require('services');
const {AccessDeniedError, CustomError} = require('errors');
const {strings} = require('assets');

const checkSigned = () => {
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

const checkUnsigned = () => {
  return async (req, res, next) => {
    const sessionId = req.cookies.session;
    if (sessionId) {
next(new CustomError(strings.userAlreadySigned));
} else {
next();
}
  };
};

module.exports = {
  checkSigned,
  checkUnsigned,
};
