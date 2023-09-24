const dotenv = require("dotenv");

dotenv.config();

const vars = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  isProd: process.env.NODE_ENV === "production",

  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
  },

  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    secure: process.env.EMAIL_SECURE,
    from: process.env.EMAIL_FROM,
  },

  aws: {
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },

  cookie: {
    secret: process.env.COOKIE_SECRET,
  },

  client: {
    url: process.env.CLIENT_URL ? process.env.CLIENT_URL : 'http://localhost:3000',
  },

  invitation: {
    expiresIn: process.env.INVITATION_EXPIRES_IN,
  },
};

export default vars;
