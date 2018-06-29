import { ensureUser, ensureRecaptcha } from '../../middleware/validators';
import { prepareParams, extract } from '../../middleware/smartRequest';
import * as user from './controller';

export const baseUrl = '/api/v1/users';

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      ensureRecaptcha,
      prepareParams(ctx => extract(ctx.request.body)(['username', 'password'])),
      user.createUser
    ]
  },
];
