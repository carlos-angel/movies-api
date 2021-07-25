const { port } = require('./config/index');
const express = require('express');
const app = express();
const { moviesApi, userMovieApi, authApi } = require('./routes');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const {
  errorHandler,
  logErrors,
  wrapError,
} = require('./utils/middleware/errorHandlers');
const debug = require('debug')('app:server');
const helmet = require('helmet');

/** middleware */
app.use(express.json());
app.use(helmet());

/** routes */
authApi(app);
moviesApi(app);
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
