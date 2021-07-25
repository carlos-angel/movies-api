const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const { verifyPassword } = require('../../helpers/passwordHandler');
const { UserService } = require('../../../services/index');

passport.use(
  new BasicStrategy(async function (email, password, callback) {
    const userService = new UserService();
    try {
      const user = await userService.getUser({ email });
      if (!user) {
        return callback(boom.unauthorized(), false);
      }
      if (!verifyPassword(user.password, password)) {
        return callback(boom.unauthorized(), false);
      }
      delete user.password;
      return callback(null, user);
    } catch (error) {
      return callback(error);
    }
  })
);
