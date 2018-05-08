const joi = require('joi');

const create = joi.object().required().keys({
  name: joi.string().min(5).max(20).required(),
  password: joi.string().min(5).max(20).required(),
});

module.exports = {
  create,
};