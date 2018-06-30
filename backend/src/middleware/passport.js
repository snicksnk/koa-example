import passport from 'koa-passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as VKontakteStrategy } from 'passport-vkontakte';
import { Strategy } from 'passport-local';
import User from '../models/users';

export default function config(config) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id, '-password');
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use('local', new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) { return done(null, false); }
      try {
        const isMatch = await user.validatePassword(password);
        if (!isMatch) { return done(null, false); }
        done(null, user);
      } catch (err) {
        done(err);
      }
    } catch (err) {
      return done(err);
    }
  }));


  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new VKontakteStrategy({
    ...config.vk
  },
  async (accessToken, refreshToken, params, profile, done) => {
    const existentUsers = await User.find({ vkId: profile.id });
    if (!existentUsers.length > 0) {
      const newUser = new User({
        username: `__vk_${profile.id}`,
        vkId: profile.id,
        displayName: `${profile.displayName}`
      });
      await newUser.save();
      return done(null, newUser);
    } else {
      return done(null, existentUsers[0]);
    }
  }));

  passport.use(new GoogleStrategy({
    ...config.google
  },
  async (token, tokenSecret, profile, done) => {
    try {
      const existentUsers = await User.find({ googleId: profile.id });

      if (!existentUsers.length > 0) {
        const newUser = new User({
          username: `__google_${profile.id}`,
          googleId: profile.id,
          displayName: profile.displayName
        });
        await newUser.save();
        return done(null, newUser);
      } else {
        return done(null, existentUsers[0]);
      }
    } catch (err) {
      return done(err);
    }
  }
  ));

  return passport;
}
