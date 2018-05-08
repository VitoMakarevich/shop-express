const {redis} = require('modules');

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

module.exports = {
  create,
};
