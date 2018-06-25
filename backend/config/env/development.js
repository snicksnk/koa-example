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

export default {
  session: 'secret-boilerplate-token',
  token: 'secret-jwt-token',
  database: {
    link: `mongodb://${DB.HOST}/${DB.DATABASENAME}`,
    options
  },
  port: 5000
};
