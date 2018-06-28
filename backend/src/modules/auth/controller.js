import passport from 'koa-passport';

export async function authUser(ctx, next) {
  return passport.authenticate('local', (user) => {
    if (!user) {
      ctx.throw(401);
    }

    const token = user.generateToken();

    const response = user.toJSON();

    delete response.password;

    ctx.body = {
      token,
      user: response
    };
  })(ctx, next);
}


export async function googleAuth(ctx, next) {
  return passport.authenticate('google', { scope: ['email'] })(ctx, next);
}

export async function googleAuthCallback(ctx, next) {
  return passport.authenticate('google', async user => {
    console.log('google', user);

    const token = user.generateToken();
    const response = user.toJSON();
    delete response.password;

    ctx.body = {
      token,
      user: response
    };
  })(ctx, next);
}

export async function vkAuth(ctx, next) {
  return passport.authenticate('vkontakte')(ctx, next);
}


export async function vkAuthCallback(ctx, next) {
  return passport.authenticate('vkontakte', async user => {
    console.log('vk', user);

    const token = user.generateToken();
    const response = user.toJSON();
    delete response.password;

    ctx.body = {
      token,
      user: response
    };
  })(ctx, next);
}