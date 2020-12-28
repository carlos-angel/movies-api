const express = require('express');
const { success } = require('../network/success');
const { UserService } = require('../services/index');
const { UserSchema } = require('../utils/schemas');
const validation = require('../utils/middleware/validationHandler');

function usersApp(app) {
  const router = express.Router();
  app.use('/api/v1/users', router);
  const userService = new UserService();

  router.post(
    '/',
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
}

module.exports = usersApp;
