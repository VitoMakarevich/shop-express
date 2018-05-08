const {assert} = require('chai');
const app = require('app');
const {user: UserService} = require('services');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const agent = require('supertest');

describe('User api test', (_) => {
  describe('User: create', (_) => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return validation error', async () => {
      const request = {
        name: 'ner',
        password: 'qwerty',
      };

      const res = await agent(app)
        .post('/users/')
        .send(request);
      const expectedStatus = 400;
      assert.equal(res.status, expectedStatus);
    });

    it('should create user', async () => {
      const request = {
        name: 'valid',
        password: 'valid',
      };

      const serviceResponse = {
        id: 1,
        name: 'valid',
      };

      const createUserStub = sandbox.stub(
        UserService,
        'create'
      )
        .withArgs(request)
        .resolves(serviceResponse);

      const res = await agent(app)
        .post('/users/')
        .send(request);

      const expectedStatus = 200;
      assert.equal(res.status, expectedStatus);
      assert.deepEqual(res.body, serviceResponse);
      assert.isTrue(createUserStub.calledOnce);
    });
  });

  describe('User: signIn', (_) => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return validation error', async () => {
      const request = {
        name: 'ner',
        password: 'qwerty',
      };

      const res = await agent(app)
        .post('/users/signIn')
        .send(request);
      const expectedStatus = 400;
      assert.equal(res.status, expectedStatus);
    });

    it('should throw error', async () => {
      const request = {
        name: 'valid',
        password: 'valid',
      };

      const serviceResponse = {
        sessionId: '213123',
        user: {
          id: 1,
          name: 'name',
        },
      };

      const checkSignInStub = sandbox.stub(
        UserService,
        'checkSignIn'
      )
        .withArgs(request)
        .resolves(serviceResponse);

      const res = await agent(app)
        .post('/users/signIn')
        .expect('set-cookie', 'session=213123; Path=/')
        .send(request);

      const expectedStatus = 200;
      assert.equal(res.status, expectedStatus);
      const expectedRes = {
        id: 1,
        name: 'name',
      };
      assert.deepEqual(res.body, expectedRes);
      assert.isTrue(checkSignInStub.calledOnce);
    });
  });
});
