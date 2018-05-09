const {assert} = require('chai');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const {auth: authService} = require('services');
const {auth} = require('middlewares');
const {CustomError} = require('errors');

describe('Middlewares tests', () => {
  describe('Check signed test', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should verify as signed', async () => {
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
      const checkAuthMiddleware = auth.checkSigned();
      await checkAuthMiddleware(reqStub, null, nextStub);

      assert.isTrue(nextStub.calledOnce);
      assert.isTrue(checkSessionServiceStub.calledOnce);
    });
  });

  describe('Check unsigned test', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should throw error as already signed', async () => {
      const nextStub = sandbox.stub();
      const reqStub = {
        cookies: {
          session: '2134521',
        },
      };
      const checkUnsignedMiddleware = auth.checkUnsigned();
      await checkUnsignedMiddleware(reqStub, null, nextStub);
      assert.isTrue(nextStub.firstCall.args[0] instanceof CustomError);
    });

    it('should pass because user not signed', async () => {
      const nextStub = sandbox.stub();
      const reqStub = {
        cookies: {
        },
      };
      const checkUnsignedMiddleware = auth.checkUnsigned();
      await checkUnsignedMiddleware(reqStub, null, nextStub);
      assert.isUndefined(nextStub.firstCall.args[0]);
    });
  });
});
