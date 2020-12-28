const joi = require('joi');

const { movieIdSchema } = require('./movies.schema');
const { userIdSchema } = require('./users.schema');

const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserMovieSchema = {
  userId: userIdSchema,
  movieId: movieIdSchema,
};

module.exports = {
  userMovieIdSchema,
  createUserMovieSchema,
};
