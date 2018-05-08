const {assert} = require('chai');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const {Session: SessionModel} = require('models');
const {redis} = require('modules');

describe('Session model tests', () => {
  afterEach(() => {
    sandbox.restore();
  });
  it('should create empty', async () => {
    const redisSetStub = {
      set: async (key, session, timeUnit, expiration) => {
        // eslint-disable-next-line
        assert.match(key, /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}-/);
        const stringifiedEmptySession = JSON.stringify({
          profileId: null,
        });
        assert.deepEqual(session, stringifiedEmptySession);
        const secondsTimeUnit = 'EX';
        assert.equal(timeUnit, secondsTimeUnit);
        const oneDayExpiration = 24 * 60 * 60;
        assert.equal(expiration, oneDayExpiration);

        return key;
      },
    };

    const redisModuleStub = sandbox.stub(
      redis,
      'connect'
    )
      .resolves(redisSetStub);

    const result = await SessionModel.create();
    assert.isTrue(redisModuleStub.calledOnce);
    // eslint-disable-next-line
    assert.match(result, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
  });

  it('should create with profileId', async () => {
    const redisSetStub = {
      set: async (key, session, timeUnit, expiration) => {
        // eslint-disable-next-line
        assert.match(key, /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}-/);
        const stringifiedEmptySession = JSON.stringify({
          profileId: 1,
        });
        assert.deepEqual(session, stringifiedEmptySession);
        const secondsTimeUnit = 'EX';
        assert.equal(timeUnit, secondsTimeUnit);
        const oneDayExpiration = 24 * 60 * 60;
        assert.equal(expiration, oneDayExpiration);

        return key;
      },
    };

    const redisModuleStub = sandbox.stub(
      redis,
      'connect'
    )
      .resolves(redisSetStub);

    const request = {
      profileId: 1,
    };

    const result = await SessionModel.create(request);

    assert.isTrue(redisModuleStub.calledOnce);
    // eslint-disable-next-line
    assert.match(result, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
  });
});
