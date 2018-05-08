const {assert} = require('chai');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const {Session: SessionModel} = require('models');
const {NotFoundError} = require('errors');
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

  it('should found session', async () => {
    const redisStub = {
      keys: async (pattern) => {
        // eslint-disable-next-line
        const key = '123'
        assert.match(pattern, new RegExp(`${key}-`));

        return [key];
      },
      get: async (key) => {
        const expectedKey = '123';
        assert.equal(key, expectedKey);

        const session = {
          profileId: 1,
        };

        return session;
      },
    };

    const redisModuleStub = sandbox.stub(
      redis,
      'connect'
    )
      .resolves(redisStub);

    const result = await SessionModel.findById(123);

    const expectedSession = {
      profileId: 1,
    };
    assert.deepEqual(result, expectedSession);
    assert.isTrue(redisModuleStub.calledOnce);
  });

  it('should throw error not found', async () => {
    const redisStub = {
      keys: async (pattern) => {
        // eslint-disable-next-line
        const key = '123'
        assert.match(pattern, new RegExp(`${key}-`));

        const emptyKeysSet = [];
        return emptyKeysSet;
      },
    };

    const redisModuleStub = sandbox.stub(
      redis,
      'connect'
    )
      .resolves(redisStub);
    try {
      assert.throws(await SessionModel.findById(123), NotFoundError);
    } catch (error) {
    }
    assert.isTrue(redisModuleStub.calledOnce);
  });
});
