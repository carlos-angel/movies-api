const { auth } = require('../../config/index');
const jwt = require('jsonwebtoken');

function signToken(payload) {
  return jwt.sign(payload, auth.secret);
}

module.exports = {
  signToken,
};
