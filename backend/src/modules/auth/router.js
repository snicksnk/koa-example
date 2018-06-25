import * as auth from './controller';

export const baseUrl = '/api/v1/auth';

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      auth.authUser
    ]
  }
];
