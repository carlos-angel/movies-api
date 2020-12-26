const { isDev } = require('../../config/index');

function withErrorStack(error, stack) {
  if (isDev) {
    return { error, stack };
  }
  return error;
}

/* eslint-disable */
function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json(withErrorStack(err.message, err.stack));
}
/* eslint-disable */

module.exports = {
  logErrors,
  errorHandler,
};
