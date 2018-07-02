import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import logger from 'koa-logger';
import mongoose from 'mongoose';
// import session from 'koa-generic-session';
// import passport from 'koa-passport';
import mount from 'koa-mount';
import serve from 'koa-static';
import cors from 'koa-cors';
import setUpPassport from '../src/middleware/passport';
import { errorMiddleware } from '../src/middleware';
import config from '../config';

console.log('🐝 Starting', config);

const app = new Koa();
app.keys = [config.session];

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.database.link, config.database.options);
}

app.use(cors());

app.use(convert(logger()));
app.use(bodyParser());
// app.use(session());
app.use(errorMiddleware());

app.use(convert(mount('/docs', serve(`${process.cwd()}/docs`))));

// require('../config/passport');

const passport = setUpPassport(config);

app.use(passport.initialize());
// app.use(passport.session());

const modules = require('../src/modules');

modules(app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`Server started on ${config.port}`);
  });
}

export default app;
