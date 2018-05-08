const {sequelize} = require('modules');
const Sequelize = require('sequelize');
const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  salt: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});

module.exports = User;
