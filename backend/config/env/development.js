const DB = {
  HOST: process.env.DB_HOST || 'localhost',
  DATABASENAME: process.env.DB_NAME || 'mm',
  USER: process.env.DB_USER,
  PASS: process.env.DB_PASSWORD,
  AUTHSOURCE: process.env.DB_AUTHSOURCE,
  PORT: process.env.DB_PORT || 27019,
};

const options = {
  user: DB.USER,
  pass: DB.PASS,
  auth: {
    authdb: DB.AUTHSOURCE,
  },
};

const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 5000;

export default {
  port,
  host,
  session: 'secret-boilerplate-token',
  token: 'secret-jwt-token',
  database: {
    link: `mongodb://${DB.HOST}/${DB.DATABASENAME}`,
    options
  },
  vk: {
    clientID: '6618337',
    clientSecret: 'xf3YFV1Z2mWYRu5Pnvbc',
    callbackURL: `${host}:${port}/api/v1/auth/vk/callback`
  },
  google: {
    clientID: '891679427800-ovo1s76okn9j11bbtbss13asfmumu1r7.apps.googleusercontent.com',
    clientSecret: 'EmUSYJ-5YSJktou0AEGkeyfk',
    callbackURL: `${host}:${port}/api/v1/auth/google/callback`
  }
};
