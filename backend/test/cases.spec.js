import app from '../bin/server';
import supertest from 'supertest';
import assert from 'assert';
import { cleanDb } from './utils';

const request = supertest.agent(app.listen());
const context = {};

describe('Users', function() {
  const urlPrefix = '/api/v1/users';
  this.timeout(10000);

  describe(`POST ${urlPrefix} - create user`, () => {
    it('Sign up user success', (done) => {
      request
        .post(`${urlPrefix}`)
        .send({ username: 'login', password: 'pass' })
        .set('Accept', 'application/json')
        .expect(200, (err, res) => {
          if (err) {
            return done(err);
          }

          console.log(res.body);
          // assert.equal(typeof res.body.inbox === 'object', true);


          done();
        });
    });
  });
});
