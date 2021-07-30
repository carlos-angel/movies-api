const assert = require('assert');
const proxyquire = require('proxyquire');
const {
  MoviesServiceMock,
  moviesMock,
  filteredMoviesMocks,
} = require('../utils/mocks/movies.mock');

const testServer = require('../utils/testServer');

const services = {
  MovieService: MoviesServiceMock,
};

describe('routes - movies', () => {
  const route = proxyquire('../routes/movies.routes', {
    '../services/index': services,
  });

  const request = testServer(route);

  describe('GET /movies', () => {
    it('should response with status 200', (done) => {
      request.get('/api/v1/movies').expect(200, done);
    });

    it('should respond with the list of movies', (done) => {
      request.get('/api/v1/movies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          message: 'movies listed',
        });
        done();
      });
    });
  });

  describe('GET /movies', () => {
    it('should response with status 200', (done) => {
      request.get('/api/v1/movies?tags[]=Drama').expect(200, done);
    });

    it('should respond with the list of movies', (done) => {
      request.get('/api/v1/movies?tags[]=Drama').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: filteredMoviesMocks('Drama'),
          message: 'movies listed',
        });
        done();
      });
    });
  });

  describe('GET /movies/:movieId', () => {
    it('should response with status 200', (done) => {
      request.get('/api/v1/movies/5fe7746a91b2fb7af4ecfca5').expect(200, done);
    });

    it('should respond with the data of the requested movie', (done) => {
      request.get('/api/v1/movies/5fe7746a91b2fb7af4ecfca5').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0],
          message: 'movie retrieved',
        });
        done();
      });
    });
  });

  describe('POST /movies', () => {
    it('should response with status 201', (done) => {
      request.post('/api/v1/movies').expect(201, done);
    });

    it('should respond with the id of the movie created', (done) => {
      request.post('/api/v1/movies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0].id,
          message: 'movie created',
        });
        done();
      });
    });
  });

  describe('PUT /movies/:movieId', () => {
    it('should response with status 200', (done) => {
      request.put('/api/v1/movies/5fe7746a91b2fb7af4ecfca5').expect(200, done);
    });

    it('should respond with the id of the movie updated', (done) => {
      request.put('/api/v1/movies/5fe7746a91b2fb7af4ecfca5').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0].id,
          message: 'movie updated',
        });
        done();
      });
    });
  });

  describe('DELETE /movies/:moviesId', () => {
    it('should response with status 200', (done) => {
      request
        .delete('/api/v1/movies/5fe7746a91b2fb7af4ecfca5')
        .expect(200, done);
    });

    it('should respond with the id of the movie deleted', (done) => {
      request
        .delete('/api/v1/movies/5fe7746a91b2fb7af4ecfca5')
        .end((err, res) => {
          assert.deepStrictEqual(res.body, {
            data: moviesMock[0].id,
            message: 'movie deleted',
          });
          done();
        });
    });
  });
});
