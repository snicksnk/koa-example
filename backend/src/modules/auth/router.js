import * as auth from './controller';

export const baseUrl = '/api/v1/auth';

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      auth.authUser
    ]
  },
  {
    method: 'GET',
    route: '/google',
    handlers: [
      auth.googleAuth
    ]
  },
  {
    method: 'GET',
    route: '/google/callback',
    handlers: [
      auth.googleAuthCallback,
    ]
  },
  {
    method: 'GET',
    route: '/vk',
    handlers: [
      auth.vkAuth
    ]
  },
  {
    method: 'GET',
    route: '/vk/callback',
    handlers: [
      auth.vkAuthCallback,
    ]
  }
];
