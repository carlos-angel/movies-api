const { isDev } = require('../config');

function cacheResponse(res, seconds) {
  if (!isDev) {
    res.set('Cache-Control', `public, max-age${seconds}`);
  }
}

module.exports = cacheResponse;
