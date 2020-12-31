const express = require('express');
const boom = require('@hapi/boom');
const passport = require('passport');
const axios = require('axios');
const { config } = require('../config');
const THIRTY_DAYS_IN_SEC = 2592000000;
const TWO_HOURS_IN_SEC = 7200000;
/** basic strategy */
require('../utils/auth/strategies/basic');

function authApp(app) {
  const router = express.Router();
  router.use('/auth', app);

  router.post('/sign-in', async function (req, res, next) {
    const { rememberMe } = req.body;
    passport.authenticate('basic', function (error, data) {
      try {
        if (error || !data) {
          next(boom.unauthorized());
        }
        req.login(data, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          const { token, ...user } = data.data;

          res.cookie('token', token, {
            httpOnly: !config.dev,
            secure: !config.dev,
            maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
          });
          res.status(200).json(user);
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/sign-up', async function (req, res, next) {
    const { body: user } = req;
    try {
      await axios({
        url: `${config.apiUrl}/api/v1/auth/sign-up`,
        method: 'post',
        data: user,
      });

      res.status(201).json({ message: 'user created' });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = authApp;
