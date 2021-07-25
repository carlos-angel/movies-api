const express = require('express');
const boom = require('@hapi/boom');
const passport = require('passport');
const { config } = require('../config');
const THIRTY_DAYS_IN_SEC = 2592000000;
const TWO_HOURS_IN_SEC = 7200000;

/** facebook strategy */
require('../utils/auth/strategies/facebook.strategy');

function facebookApp(app) {
  const routes = express.Router();
  app.use('/auth', routes);

  routes.get('/facebook', passport.authenticate('facebook'));

  routes.get(
    '/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    function (req, res, next) {
      const { rememberMe } = req.body;
      if (!req.user) {
        next(boom.unauthorized());
      }
      const { token, ...user } = req.user.data;
      res.cookie('token', token, {
        httpOnly: !config.dev,
        secure: !config.dev,
        maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
      });
      res.status(200).json(user);
    }
  );
}

module.exports = facebookApp;
