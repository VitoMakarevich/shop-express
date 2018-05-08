const {assert} = require('chai');
const {user: UserService} = require('services');
// eslint-disable-next-line
const {User: UserModel, Session: SessionModel} = require('models');
const {passwordUtils} = require('helpers');
const sinon = require('sinon');
const {CustomError} = require('errors');
const sandbox = sinon.createSandbox();

describe('User service', (_) => {
  describe('Create user', (_) => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should create user', async () => {
      const generateSaltStub = sandbox.stub(
        passwordUtils,
        'generateSalt'
      )
        .resolves('salt');

      const hashPasswordRequestPassword = 'password';
      const hashPasswordRequestSalt = 'salt';
      const hashPasswordStub = sandbox.stub(
        passwordUtils,
        'hashPassword'
      )
        .withArgs(hashPasswordRequestPassword, hashPasswordRequestSalt)
        .resolves('hashedPassword');

      const userModelResult = {
        id: 1,
        name: 'names',
        password: 'hashedPassword',
        salt: 'salt',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const userModelRequest = {
        name: 'names',
        password: 'hashedPassword',
        salt: 'salt',
      };

      const userModelStub = sandbox.stub(
        UserModel,
        'create'
      )
        .withArgs(userModelRequest)
        .resolves(userModelResult);

      const request = {
        name: 'names',
        password: 'password',
      };

      const result = await UserService.create(request);

      const expectedResult = {
        id: 1,
        name: 'names',
      };

      assert.deepEqual(result, expectedResult);
      assert.isTrue(userModelStub.calledOnce);
      assert.isTrue(generateSaltStub.calledOnce);
      assert.isTrue(hashPasswordStub.calledOnce);
    });
  });
  describe('Check sign in', (_) => {
    afterEach(() => {
      sandbox.restore();
    });

    it('Throw error because no user with such email', async () => {
      const userModelRequest = {
        where: {
          name: 'names',
        },
      };

      const userModelStub = sandbox.stub(
        UserModel,
        'findOne'
      )
        .withArgs(userModelRequest);

      const request = {
        name: 'names',
        password: 'password',
      };

      try {
        await UserService.checkSignIn(request);
      } catch (error) {
        assert.isTrue(error instanceof CustomError);
      }

      assert.isTrue(userModelStub.calledOnce);
    });

    it('Throw error because password is incorrect', async () => {
      const userModelRequest = {
        where: {
          name: 'names',
        },
      };

      const userModelStubResult = {
        id: 1,
        name: 'name',
        password: 'password',
        salt: 'salt',
      };

      const userModelStub = sandbox.stub(
        UserModel,
        'findOne'
      )
        .withArgs(userModelRequest)
        .resolves(userModelStubResult);

      const hashPasswordRequestPassword = 'password';
      const hashPasswordRequestSalt = 'salt';
      const hashPasswordStub = sandbox.stub(
        passwordUtils,
        'hashPassword'
      )
        .withArgs(hashPasswordRequestPassword, hashPasswordRequestSalt)
        .resolves('hashedPassword');

      const request = {
        name: 'names',
        password: 'password',
      };

      try {
        await UserService.checkSignIn(request);
      } catch (error) {
        assert.isTrue(error instanceof CustomError);
      }

      assert.isTrue(userModelStub.calledOnce);
      assert.isTrue(hashPasswordStub.calledOnce);
    });

    it('Authenticate user', async () => {
      const userModelRequest = {
        where: {
          name: 'names',
        },
      };

      const userModelStubResult = {
        id: 1,
        name: 'names',
        password: 'hashedPassword',
        salt: 'salt',
      };

      const userModelStub = sandbox.stub(
        UserModel,
        'findOne'
      )
        .withArgs(userModelRequest)
        .resolves(userModelStubResult);

      const hashPasswordRequestPassword = 'password';
      const hashPasswordRequestSalt = 'salt';
      const hashPasswordStub = sandbox.stub(
        passwordUtils,
        'hashPassword'
      )
        .withArgs(hashPasswordRequestPassword, hashPasswordRequestSalt)
        .resolves('hashedPassword');

      const expectedSession = {
        profileId: 1,
      };
      const sessionCreateStubResult = '213421';
      const sessionCreateStub = sandbox.stub(
        SessionModel,
        'create'
      )
        .withArgs(expectedSession)
        .resolves(sessionCreateStubResult);

      const request = {
        name: 'names',
        password: 'password',
      };

      const result = await UserService.checkSignIn(request);

      const expectedResult = {
        user: {
          id: 1,
          name: 'names',
        },
        sessionId: '213421',
      };

      assert.deepEqual(result, expectedResult);
      assert.isTrue(sessionCreateStub.calledOnce);
      assert.isTrue(userModelStub.calledOnce);
      assert.isTrue(hashPasswordStub.calledOnce);
    });
  });
});
