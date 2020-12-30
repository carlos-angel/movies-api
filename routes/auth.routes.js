const express = require('express');
const { success } = require('../network/success');
const passport = require('passport');
const boom = require('@hapi/boom');
const { signToken } = require('../utils/helpers/tokenHandler');
const { ApiKeysService, UserService } = require('../services/index');
const validation = require('../utils/middleware/validationHandler');
const { UserSchema } = require('../utils/schemas/index');
/** Basic strategy */
require('../utils/auth/strategies/basic.strategy');

function authApi(app) {
  const router = express.Router();
  app.use('/api/v1/auth', router);

  const apiKeyService = new ApiKeysService();
  const userService = new UserService();

  router.post('/sign-in', async (req, res, next) => {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }

    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }
        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error);
          }
          const apiKey = await apiKeyService.getApiKey({ token: apiKeyToken });
          if (!apiKey) {
            next(boom.unauthorized());
          }

          const { _id: id, name, email } = user;
          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };

          const token = signToken(payload);
          const data = { token, user: { id, name, email } };

          success(req, res, data, 'sign in success', 200);
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post(
    '/sign-up',
    validation(UserSchema.createUserSchema),
    async (req, res, next) => {
      const { body: user } = req;
      try {
        const data = await userService.createUser({ user });
        success(req, res, data, 'user created', 201);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/sign-provider',
    validation(UserSchema.createProviderUserSchema),
    async (req, res, next) => {
      const { apiKeyToken, ...user } = req.body;
      if (!apiKeyToken) {
        next(boom.unauthorized('apiKeyToken is required'));
      }
      try {
        const queriedUser = await userService.getOrCreateUser({ user });
        const apiKey = await apiKeyService.getApiKey({ token: apiKeyToken });
        if (!apiKey) {
          next(boom.unauthorized());
        }

        const { _id: id, name, email } = queriedUser;
        const payload = {
          sub: id,
          name,
          email,
          scopes: apiKey.scopes,
        };

        const token = signToken(payload);
        const data = { token, user: { id, name, email } };

        success(req, res, data, 'sign in success', 200);
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = authApi;
