const joi = require('joi');
const {ValidationError} = require('errors');

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
  validate,
};
