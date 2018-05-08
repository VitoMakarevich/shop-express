const {assert} = require('chai');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const {Session} = require('models');
const {common: {appendSession}} = require('middlewares');

describe('Middlewares tests', () => {
  describe('Append session middleware', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should append session', async () => {
      const sessionKey = 'f8916e60-5297-11e8-b587-3bc83baeec06';
      const sessionModelStub = sandbox.stub(
        Session,
        'create'
      )
        .resolves(sessionKey);

      const fakeReq = {
        cookies: {},
      };

      const fakeRes = {
        cookie: sandbox.stub()
          .withArgs('session', sessionKey)
          .resolves(),
      };

      const fakeNext = sandbox.stub();

      await appendSession(fakeReq, fakeRes, fakeNext);

      assert.isTrue(fakeRes.cookie.calledOnce);
      assert.isTrue(sessionModelStub.calledOnce);
      assert.isTrue(fakeNext.calledOnce);
    });
  });
});
