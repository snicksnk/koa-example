const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 5000;

export default {
  port,
  host,
  // jwt token
  token: 'secret-jwt-token',
  database: {
    host: process.env.DB_HOST || 'localhost',
    databaseName: process.env.DB_NAME || 'mm',
    port: process.env.DB_PORT || 27019,
    options: {
      autoIndex: false,
      connectTimeoutMS: 1000,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      auth: {
        authdb: process.env.DB_AUTHSOURCE,
      },
    }
  },
  // List of modules enabled in app, loaded from src/modules
  modules: [
    'users',
    'auth',
    'feeds'
  ],
  recaptcha: {
    siteSecret: '6LecGmEUAAAAADXvFDUrR5OEVOgpJs7Nin9MxhO1'
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
