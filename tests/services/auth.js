const {assert} = require('chai');
const {auth: authService} = require('services');
// eslint-disable-next-line
const {User: UserModel, Session: SessionModel} = require('models');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

  describe('Auth: check', (_) => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return session', async () => {
      const fakeSession = {
        profileId: 1,
      };

      const sessionModelStub = sandbox.stub(
        SessionModel,
        'findById'
      )
        .withArgs(123)
        .resolves(fakeSession);

      const sessionId = 123;

      const result = await authService.checkAuth(sessionId);

      const expectedResult = {
        profileId: 1,
      };

      assert.deepEqual(result, expectedResult);
      assert.isTrue(sessionModelStub.calledOnce);
    });
  });
