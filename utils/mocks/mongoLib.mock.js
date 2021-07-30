const sinon = require('sinon');
const { moviesMock, filteredMoviesMocks } = require('./movies.mock');

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMocks('Drama'));

const getStub = sinon.stub();

const createStub = sinon.stub().resolves(moviesMock[0].id);

const updateStub = sinon.stub();

const deleteStub = sinon.stub();

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  get(collection, id) {
    getStub.withArgs('movies', id).resolves(moviesMock[0]);
    return getStub(collection, id);
  }

  create(collection, data) {
    return createStub(collection, data);
  }

  update(collection, id, data) {
    updateStub.withArgs('movies', id).resolves(moviesMock[0].id);
    return updateStub(collection, id, data);
  }

  delete(collection, id) {
    deleteStub.withArgs('movies', id).resolves(moviesMock[0].id);
    return deleteStub(collection, id);
  }
}

module.exports = {
  getAllStub,
  getStub,
  createStub,
  updateStub,
  deleteStub,
  MongoLibMock,
};
