import { verify } from 'jsonwebtoken';
import recaptcha from 'recaptcha-validator';
import User from '../models/users';
import config from '../../config';
import { getToken } from '../utils/auth';

export async function ensureUser(ctx, next) {
  const token = getToken(ctx);

  if (!token) {
    ctx.throw(401);
  }

  let decoded = null;
  try {
    decoded = verify(token, config.token);
  } catch (err) {
    ctx.throw(401);
  }

  ctx.state.user = await User.findById(decoded.id, '-password');
  if (!ctx.state.user) {
    ctx.throw(401);
  }

  return next();
}

export async function ensureRecaptcha(ctx, next) {
  if (process.env.NODE_ENV === 'test' && !ctx.request.body['g-recaptcha-response']) {
    return next();
  }

  const gRecaptchaResponse = ctx.request.body['g-recaptcha-response'];

  try {
    await recaptcha(
      config.recaptcha.siteSecret,
      gRecaptchaResponse,
      ctx.request.ip
    );
  } catch (err) {
    if (typeof err === 'string') {
      console.warn(`Got invalid captcha: ${err}`);
      ctx.body = {
        _errors: {
          captcha: 'Captcha is not passed'
        }
      };
      return;
    }
    ctx.throw(403);
  }
  return next();
}
