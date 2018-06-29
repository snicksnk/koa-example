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

export async function getUsers(ctx) {
  const users = await User.find({}, '-password');
  ctx.body = { users };
}

export async function getUser(ctx, next) {
  try {
    const user = await User.findById(ctx.params.id, '-password');
    if (!user) {
      ctx.throw(404);
    }

    ctx.body = {
      user
    };
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404);
    }

    ctx.throw(500);
  }
  if (next) { return next(); }
}

export async function updateUser(ctx) {
  const user = ctx.body.user;
  Object.assign(user, ctx.request.body.user);

  await user.save();

  ctx.body = {
    user
  };
}

export async function deleteUser(ctx) {
  const user = ctx.body.user;

  await user.remove();

  ctx.status = 200;
  ctx.body = {
    success: true
  };
}
