const { port } = require('./config/index');
const express = require('express');
const app = express();

/** middleware */
app.use(express.json());

/** routes */
app.get('/', (req, res) => res.json({ hello: 'hello world' }));

/**server */
app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`);
});
