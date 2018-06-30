import User from '../../models/users';
import { user as userValidator } from './validators';

export async function createUser(ctx) {
  const userData = ctx.request.smartParams;
  const alredyExistentUser = await User.find({ username: userData.username });
  // TODO Add validation

  const errors = userValidator(userData);

  if (errors) {
    ctx.body = {
      errors
    };
    ctx.status = 400;
    return;
  }

  if (alredyExistentUser.length > 0) {
    ctx.body = {
      errors: {
        username: ['Alredy exists']
      }
    };
    ctx.status = 400;
  } else {
    try {
      const user = new User(userData);
      await user.save();
      const token = user.generateToken();
      const response = user.toJSON();
      delete response.password;
      ctx.body = {
        user: response,
        token
      };
    } catch (err) {
      ctx.body = { errors: [err.message] };
      ctx.status = 400;
    }
  }
}
