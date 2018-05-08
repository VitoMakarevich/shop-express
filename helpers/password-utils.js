const bcrypt = require('bcrypt');
const util = require('util');

bcrypt.genSalt = util.promisify(bcrypt.genSalt);
bcrypt.hash = util.promisify(bcrypt.hash);

const saltRounds = 5;

const generateSalt = (_) => bcrypt.genSalt(saltRounds);
const hashPassword = bcrypt.hash;

module.exports = {
  generateSalt,
  hashPassword,
};
