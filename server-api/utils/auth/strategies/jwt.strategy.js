const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');
const { UserService } = require('../../../services/index');
const { auth } = require('../../../config/index');

passport.use(
  new Strategy(
    {
      secretOrKey: auth.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, callback) {
      const userService = new UserService();
      try {
        const user = await userService.getUser({ email: tokenPayload.email });

        if (!user) {
          return callback(boom.unauthorized(), false);
        }

        delete user.password;
        return callback(false, { ...user, scopes: tokenPayload.scopes });
      } catch (error) {
        return callback(error);
      }
    }
  )
);
