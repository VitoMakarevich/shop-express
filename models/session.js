const {redis} = require('modules');
const {NotFoundError} = require('errors');

const uuid = require('uuid/v1');
const sessionExpirationInSeconds = 24 * 60 * 60;

const create = async (session = {profileId: null}) => {
  const sessionId = uuid();
  const sessionKey = `${sessionId}-`;
  const db = await redis.connect();
  const stringifiedSession = JSON.stringify(session);
  await db.set(
    sessionKey,
    stringifiedSession,
    'EX',
    sessionExpirationInSeconds
  );

  return sessionId;
};

const findById = async (id = '') => {
  const sessionKey = `${id}-*`;
  const db = await redis.connect();

  const keys = await db.keys(
    sessionKey,
  );

  if (keys.length) {
    const session = await db.get(keys[0]);

    return session;
  } else {
    throw new NotFoundError();
  }
};

module.exports = {
  create,
  findById,
};
