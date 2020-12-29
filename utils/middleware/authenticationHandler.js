const passport = require('passport');
const boom = require('@hapi/boom');
require('../auth/strategies/jwt.strategy');

const authenticationHandler = (req, res, next) => {
  passport.authenticate('jwt', (error, user) => {
    if (error || !user) {
      next(boom.unauthorized());
    }
    req.login(user, { session: false }, (err) => (err ? next(err) : next()));
  })(req, res, next);
};

module.exports = authenticationHandler;
