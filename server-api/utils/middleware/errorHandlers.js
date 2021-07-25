const { isDev } = require('../../config/index');
const boom = require('@hapi/boom');
const debug = require('debug')('app:error');

function withErrorStack(error, stack) {
  if (isDev) {
    return { ...error, stack };
  }
  return error;
}

/* eslint-disable */
function wrapError(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function logErrors(err, req, res, next) {
  debug(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}
/* eslint-disable */

module.exports = {
  logErrors,
  wrapError,
  errorHandler,
};
