// DEBUG=app:* node scripts/mongo/seedUsers.js

const { signPassword } = require('../../utils/helpers/passwordHandler');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const MongoLib = require('../../lib/mongo');
const { admin, public } = require('../../config/index');

const users = [
  {
    email: admin.email,
    name: admin.name,
    password: admin.password,
    isAdmin: true,
  },
  {
    email: public.email,
    name: public.name,
    password: public.password,
  },
];

async function createUser(mongoDB, user) {
  const { name, email, password, isAdmin } = user;
  const hashedPassword = signPassword(password);

  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin),
  });

  return userId;
}

async function seedUsers() {
  try {
    const mongoDB = new MongoLib();

    const promises = users.map(async (user) => {
      const userId = await createUser(mongoDB, user);
      debug(chalk.green('User created with id:', userId));
    });

    await Promise.all(promises);
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedUsers();
