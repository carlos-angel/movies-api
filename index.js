const { port } = require('./config/index');
const express = require('express');
const app = express();
const { moviesApi } = require('./routes');
const { errorHandler, logErrors } = require('./utils/middleware/errorHandlers');

/** middleware */
app.use(express.json());

/** routes */
moviesApi(app);

/**errors */
app.use(logErrors);
app.use(errorHandler);

/**server */
app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`);
});
