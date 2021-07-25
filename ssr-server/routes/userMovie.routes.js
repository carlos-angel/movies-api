const express = require('express');
const boom = require('@hapi/boom');
const axios = require('axios');
const { config } = require('../config');

function userMovieApp(app) {
  const routes = express.Router();
  app.use('/user-movies', routes);

  // app.get('/movies', async function (req, res, next) {});

  routes.post('/', async function (req, res, next) {
    try {
      const { body: userMovie } = req;
      const { token } = req.cookies;

      const { data, status } = await axios({
        url: `${config.apiUrl}/api/v1/user-movies`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'post',
        data: userMovie,
      });

      if (status !== 201) {
        return next(boom.badImplementation());
      }

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  });
  routes.delete('/:userMovieId', async function (req, res, next) {
    try {
      const { userMovieId } = req.params;
      const { token } = req.cookies;

      const { data, status } = await axios({
        url: `${config.apiUrl}/api/v1/user-movies/${userMovieId}`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'delete',
      });

      if (status !== 200) {
        return next(boom.badImplementation());
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });
}

module.exports = userMovieApp;
