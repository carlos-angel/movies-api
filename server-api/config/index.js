if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  port: process.env.PORT,
  isDev: process.env.NODE_ENV !== 'production',
  mongo: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
  },
  admin: {
    name: process.env.DEFAULT_ADMIN_NAME,
    password: process.env.DEFAULT_ADMIN_PASSWORD,
    email: process.env.DEFAULT_ADMIN_EMAIL,
  },
  public: {
    name: process.env.DEFAULT_PUBLIC_NAME,
    password: process.env.DEFAULT_PUBLIC_PASSWORD,
    email: process.env.DEFAULT_PUBLIC_EMAIL,
  },
  auth: {
    secret: process.env.AUTH_JWT_SECRET,
  },
  api: {
    keyPublic: process.env.PUBLIC_API_KEY_TOKEN,
    keyAdmin: process.env.ADMIN_API_KEY_TOKEN,
  },
};
