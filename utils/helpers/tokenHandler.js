const { auth } = require('../../config/index');
const jwt = require('jsonwebtoken');

function signToken(payload) {
  return jwt.sign(payload, auth.secret, { expiresIn: '15m' });
}

module.exports = {
  signToken,
};
