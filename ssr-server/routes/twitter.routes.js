const express = require('express');
const boom = require('@hapi/boom');
const passport = require('passport');
const { config } = require('../config');
const THIRTY_DAYS_IN_SEC = 2592000000;
const TWO_HOURS_IN_SEC = 7200000;

/** twitter strategy */
require('../utils/auth/strategies/twitter.strategy');

function twitterApp(app) {
  const routes = express.Router();
  routes.use('/auth', app);

  app.get('/twitter', passport.authenticate('twitter'));

  app.get(
    '/twitter/callback',
    passport.authenticate('twitter', { session: false }),
    function (req, res, next) {
      const { rememberMe } = req.body;
      if (!req.user) {
        next(boom.unauthorized());
      }
      const { token, ...user } = req.user;
      res.cookie('token', token, {
        httpOnly: !config.dev,
        secure: !config.dev,
        maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
      });
      res.status(200).json(user);
    }
  );
}

module.exports = twitterApp;
