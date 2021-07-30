const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  MongoLibMock,
  getAllStub,
  getStub,
  createStub,
  updateStub,
  deleteStub,
} = require('../utils/mocks/mongoLib.mock');
const {
  moviesMock,
  filteredMoviesMocks,
} = require('../utils/mocks/movies.mock');

describe('services - movies', () => {
  const MovieService = proxyquire('../services/movies.service', {
    '../lib/mongo': MongoLibMock,
  });

  const moviesService = new MovieService();

  describe('when getMovies method is called', async () => {
    it('should call the getAll MongoLib method', async () => {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async () => {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('when getMovies method is called with tags', function () {
    it('should call the getAll MongoLib method with tags args', async function () {
      await moviesService.getMovies({ tags: ['Drama'] });
      const tagQuery = { tags: { $in: ['Drama'] } };
      assert.strictEqual(getAllStub.calledWith('movies', tagQuery), true);
    });

    it('should return an array of movies filtered by the tag', async function () {
      const result = await moviesService.getMovies({ tags: ['Drama'] });
      const expected = filteredMoviesMocks('Drama');
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('when getMovie method is called with movieId', function () {
    it('should call the get MongoLib method with the  param movieId', async function () {
      await moviesService.getMovie({ movieId: '5fe7746a91b2fb7af4ecfca5' });
      assert.strictEqual(getStub.called, true);
    });

    it('should return the movie with the movieId', async function () {
      const result = await moviesService.getMovie({
        movieId: '5fe7746a91b2fb7af4ecfca5',
      });
      const expected = moviesMock[0];
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('when createMovie method is called with movieId', function () {
    it('should call the create MongoLib method with the  param movieId', async function () {
      await moviesService.createMovie({});
      assert.strictEqual(createStub.called, true);
    });

    it('it should return the movieId of the created movie', async function () {
      const result = await moviesService.createMovie({});
      const expected = moviesMock[0].id;
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('when update method is called with movieId', function () {
    it('should call the update MongoLib method with the  param movieId', async function () {
      await moviesService.updateMovie({});
      assert.strictEqual(updateStub.called, true);
    });

    it('it should return the movieId of the edited movie', async function () {
      const result = await moviesService.updateMovie({
        movieId: '5fe7746a91b2fb7af4ecfca5',
      });
      const expected = moviesMock[0].id;
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('when delete method is called with movieId', function () {
    it('should call the delete MongoLib method with the  param movieId', async function () {
      await moviesService.deleteMovie({});
      assert.strictEqual(deleteStub.called, true);
    });

    it('it should return the movieId of the deleted movie', async function () {
      const result = await moviesService.deleteMovie({
        movieId: '5fe7746a91b2fb7af4ecfca5',
      });
      const expected = moviesMock[0].id;
      assert.deepStrictEqual(result, expected);
    });
  });
});
