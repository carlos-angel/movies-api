const bcrypt = require('bcrypt');

function signPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function verifyPassword(hashPassword, password) {
  return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
  signPassword,
  verifyPassword,
};
