if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  port: process.env.PORT,
  isDev: process.env.NODE_ENV !== 'production',
};
