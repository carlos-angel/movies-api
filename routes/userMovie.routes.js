const express = require('express');
const { success } = require('../network/success');
const { UserMovieService } = require('../services/index');
const validation = require('../utils/middleware/validationHandler');
const { UserSchema, UserMovieSchema } = require('../utils/schemas/index');

function userMovieApp(app) {
  const router = express.Router();
  app.use('/api/v1/user-movies', router);
  const userMovieService = new UserMovieService();

  router.get(
    '/',
    validation({ userId: UserSchema.userIdSchema }, 'query'),
    async (req, res, next) => {
      const { userId } = req.query;
      try {
        const data = await userMovieService.getUSerMovies({ userId });
        success(req, res, data, 'user movies listed', 200);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validation(UserMovieSchema.createUserMovieSchema),
    async (req, res, next) => {
      const { body: userMovie } = req;
      try {
        const data = await userMovieService.createUserMovie({ userMovie });
        success(req, res, data, 'user movie created', 201);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:userMovieId',
    validation({ userMovieId: UserMovieSchema.userMovieIdSchema }, 'params'),
    async (req, res, next) => {
      const { userMovieId } = req.params;
      try {
        const data = await userMovieService.deleteUserMovie({ userMovieId });
        success(req, res, data, 'user movie deleted', 200);
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = userMovieApp;
