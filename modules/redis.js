const redis = require('redis');
const util = require('util');

const client = redis.createClient();

client.get = util.promisify(client.get);
client.set = util.promisify(client.set);
client.keys = util.promisify(client.keys);
client.select = util.promisify(client.select);
client.del = util.promisify(client.del);

const testEnv = 'test';

const dbBindings = {
  test: 1,
  dev: 2,
  production: 3,
};

const env = process.env.NODE_ENV || testEnv;
const connect = async () => {
  await client.select(dbBindings[env]);

  return client;
};

module.exports = {
  connect,
};
