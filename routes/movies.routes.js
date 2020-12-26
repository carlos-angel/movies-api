const express = require('express');
const { success } = require('../network/success');
const { MovieService } = require('../services/index');

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

  router.get('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const data = await movieService.getMovie({ movieId });
      success(req, res, data, 'movie retrieved', 200);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body: movie } = req;
    try {
      const data = await movieService.createMovie({ movie });
      success(req, res, data, 'movies created', 201);
    } catch (error) {
      next(error);
    }
  });

  router.put('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const data = await movieService.updateMovie({ movieId, movie });
      success(req, res, data, 'movies updated', 200);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const data = await movieService.deleteMovie({ movieId });
      success(req, res, data, 'movies deleted', 200);
    } catch (error) {
      next(error);
    }
  });
}

module.exports = moviesApp;
