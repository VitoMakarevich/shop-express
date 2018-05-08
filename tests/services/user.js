const {assert} = require('chai');
const {user: UserService} = require('services');
// eslint-disable-next-line
const {User: UserModel, Session: SessionModel} = require('models');
const {passwordUtils} = require('helpers');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

describe('Services test', (_) => {
  describe('User: create', (_) => {
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
});
