const {assert} = require('chai');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const {auth: authService} = require('services');
const {auth: {checkAuth}} = require('middlewares');

describe('Middlewares tests', () => {
  describe('Check auth test', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should pass', async () => {
      const fakeSession = {
        profileId: 1,
      };

      const checkSessionServiceStub = sandbox.stub(
        authService,
        'checkAuth'
      )
        .withArgs('2134521')
        .resolves(fakeSession);
      const nextStub = sandbox.stub();
      const reqStub = {
        cookie: {
          session: '2134521',
        },
      };
      const checkAuthMiddleware = checkAuth();
      await checkAuthMiddleware(reqStub, null, nextStub);

      assert.isTrue(nextStub.calledOnce);
      assert.isTrue(checkSessionServiceStub.calledOnce);
    });
  });
});
