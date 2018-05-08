const {Session} = require('models');
const joi = require('joi');
const {ValidationError} = require('errors');

const appendSession = async (req, res, next) => {
  if (!req.cookies.session) {
    const generatedSessionId = await Session.create();
    res.cookie('session', generatedSessionId);
  }
  next();
};

const validate = (schema) => {
  const validateMiddleware = (req, res, next) => {
    const validation = joi.validate(
      req.body,
      schema,
      {abortEarly: false}
    );
    if (validation.error) {
      const validationError = new ValidationError(validation.error);
      next(validationError);
    } else {
      next();
    }
  };

  return validateMiddleware;
};


module.exports = {
  appendSession,
  validate,
};
