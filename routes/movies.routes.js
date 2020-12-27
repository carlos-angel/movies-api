const express = require('express');
const { success } = require('../network/success');
const { MovieService } = require('../services/index');
const { MoviesSchema } = require('../utils/schemas');
const validation = require('../utils/middleware/validationHandler');

function moviesApp(app) {
  const router = express.Router();
  app.use('/api/v1/movies', router);
  const movieService = new MovieService();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
      const data = await movieService.getMovies({ tags });
      success(req, res, data, 'movies listed', 200);
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:movieId',
    validation({ movieId: MoviesSchema.movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const data = await movieService.getMovie({ movieId });
        success(req, res, data, 'movie retrieved', 200);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validation(MoviesSchema.createMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      try {
        const data = await movieService.createMovie({ movie });
        success(req, res, data, 'movie created', 201);
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:movieId',
    [
      validation({ movieId: MoviesSchema.movieIdSchema }, 'params'),
      validation(MoviesSchema.updateMovieSchema),
    ],
    async (req, res, next) => {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const data = await movieService.updateMovie({ movieId, movie });
        success(req, res, data, 'movie updated', 200);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:movieId',
    validation({ movieId: MoviesSchema.movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const data = await movieService.deleteMovie({ movieId });
        success(req, res, data, 'movie deleted', 200);
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = moviesApp;
