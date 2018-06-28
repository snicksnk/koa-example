import app from '../bin/server';
import supertest from 'supertest';
import mongoose from 'mongoose'
import { cleanDb, closeConnection } from './utils';

const request = supertest.agent(app.callback());
const context = {};

const fixtures = {
  user: {
    username: 'login', password: 'pass'
  }
};

/*
describe("routes: index", () => {
  test("should respond as expected", async () => {
    const response = await request(server).get("/");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.data).toEqual("Sending some JSON");
  });
}); */

beforeAll(() => {
  // runs before all tests in this block
  cleanDb();
});

afterAll(async () => {
  await closeConnection();
}, 5000);


const urlPrefix = '/api/v1/users';
describe('Users', function() {

  describe(`POST ${urlPrefix} - create user`, () => {

    it('Sign up with wrong params', async () => {
      const response = await request
        .post(`${urlPrefix}`)
        .send({ username: '', password: '' });

      expect(response.status).toBe(400);
      expect(response.body._errors[0]).toBe('user validation failed');
    });


    it('Sign up user success', async () => {
      const response = await request
        .post(`${urlPrefix}`)
        .send(fixtures.user);

        expect(response.status).toBe(200);
        expect.anything(response.body.user._id);
        expect.anything(response.body.token);
    });

    it('Sign up existent user', async () => {
      const response = await request
        .post(urlPrefix)
        .send(fixtures.user);

      expect(response.status).toBe(400);
      expect(response.body.username[0]).toBe('Alredy exists');
    });
  });


});


/*
describe('Users', function() {
  before(function() {
    // runs before all tests in this block
    cleanDb();
  });

  const urlPrefix = '/api/v1/users';
  this.timeout(10000);

  describe(`POST ${urlPrefix} - create user`, () => {

    it('Sign up with wrong params', (done) => {
      request
        .post(`${urlPrefix}`)
        .send({ username: '', password: '' })
        .set('Accept', 'application/json')
        .expect(400, (err, res) => {
          if (err) {
            return done(err);
          }

          assert.equal(res.body._errors[0], 'user validation failed');

          done();
        });
    });

    it('Sign up user success', (done) => {
      request
        .post(`${urlPrefix}`)
        .send(fixtures.user)
        .set('Accept', 'application/json')
        .expect(200, (err, res) => {
          if (err) {
            return done(err);
          }

          assert.equal(res.body.user.username, fixtures.user.username);
          assert.ok(res.body.user._id);
          assert.ok(res.body.token);
          // assert.equal(typeof res.body.inbox === 'object', true);

          done();
        });
    });

    it('Sign up existent user', done => {
      request
        .post(urlPrefix)
        .send({ username: 'login', password: 'pass' })
        .set('Accept', 'application/json')
        .expect(400, (err, res) => {
          if (err) {
            return done(err);
          }

          assert.equal(res.body.username[0], 'Alredy exists');

          done();
        });

    });

  });
}); */
