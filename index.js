const { port } = require('./config/index');
const express = require('express');
const app = express();
const { moviesApi, userApi, userMovieApi } = require('./routes');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const {
  errorHandler,
  logErrors,
  wrapError,
} = require('./utils/middleware/errorHandlers');
const debug = require('debug')('app:server');

/** middleware */
app.use(express.json());

/** routes */
moviesApi(app);
userApi(app);
userMovieApi(app);

/** catch 404 */
app.use(notFoundHandler);

/**errors */
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

/**server */
app.listen(port, () => {
  debug(`Listening http://localhost:${port}`);
});
