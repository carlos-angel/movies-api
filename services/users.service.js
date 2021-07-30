const MongoLib = require('../lib/mongo');
const { signPassword } = require('../utils/helpers/passwordHandler');

class UserService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
    user.password = signPassword(user.password);
    const createdUserId = await this.mongoDB.create(this.collection, user);
    return createdUserId;
  }

  async getOrCreateUser({ user }) {
    const queriedUser = await this.getUser({ email: user.email });
    if (queriedUser) {
      return queriedUser;
    }

    await this.createUser({ user });
    return await this.getUser({ email: user.email });
  }
}

module.exports = UserService;
