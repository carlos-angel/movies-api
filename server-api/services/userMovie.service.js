const MongoLib = require('../lib/mongo');
const MovieService = require('./movies.service');

class UserMovieService {
  constructor() {
    this.collection = 'user-movies';
    this.mongoDB = new MongoLib();
    this.movieService = new MovieService();
  }

  async getUSerMovies({ userId }) {
    const query = userId && { userId };
    const userMovies = await this.mongoDB.getAll(this.collection, query);

    const favorites = await Promise.all(
      userMovies.map(async (userMovie) => {
        const movie = await this.movieService.getMovie({
          movieId: userMovie.movieId,
        });

        const favorite = {
          _id: userMovie._id,
          movie,
        };

        return favorite;
      })
    );

    return favorites || [];
  }

  async createUserMovie({ userMovie }) {
    const createdUserMovieId = await this.mongoDB.create(
      this.collection,
      userMovie
    );
    return createdUserMovieId;
  }

  async deleteUserMovie({ userMovieId }) {
    const deletedUserMovieId = await this.mongoDB.delete(
      this.collection,
      userMovieId
    );
    return deletedUserMovieId;
  }
}

module.exports = UserMovieService;
