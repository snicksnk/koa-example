import User from '../../models/users';

export async function createUser(ctx) {
  const userData = ctx.request.smartParams;
  const alredyExistentUser = await User.find({ username: userData.username });
  // TODO Add validation

  if (alredyExistentUser.length > 0) {
    ctx.body = { username: ['Alredy exists'] };
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
      ctx.body = { _errors: [err.message] };
      ctx.status = 400;
    }
  }
}

