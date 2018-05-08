const Sequelize = require('sequelize');
const {db} = require('config');

const {credentials, config} = db;
const sequelize = new Sequelize(
  credentials.database,
  credentials.username,
  credentials.password,
  config
);

module.exports = sequelize;
