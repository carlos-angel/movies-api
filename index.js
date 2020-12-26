const { port } = require('./config/index');
const express = require('express');
const app = express();
const { moviesApi } = require('./routes');

/** middleware */
app.use(express.json());

/** routes */
moviesApi(app);

/**server */
app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`);
});
