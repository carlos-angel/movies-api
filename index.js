const { port } = require('./config/index');
const express = require('express');
const app = express();
const { moviesApi } = require('./routes');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const {
  errorHandler,
  logErrors,
  wrapError,
} = require('./utils/middleware/errorHandlers');

/** middleware */
app.use(express.json());

/** routes */
moviesApi(app);

/** catch 404 */
app.use(notFoundHandler);

/**errors */
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

/**server */
app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`);
});
