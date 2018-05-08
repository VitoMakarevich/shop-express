const config = {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false
};

const envName = process.env.NODE_ENV || 'dev';
const credentials = {
  database: `shop_${envName}`,
  username: `shop_${envName}`,
  password: `shop_${envName}`
}

module.exports = {
  config,
  credentials
};