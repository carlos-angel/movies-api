const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { config } = require('./config');
const {
  authApp,
  googleApp,
  twitterApp,
  facebookApp,
  userMovieApp,
} = require('./routes');

const app = express();

/** middleware */
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

/** routes */
authApp(app);
googleApp(app);
twitterApp(app);
facebookApp(app);
userMovieApp(app);

/** ssr-server */
app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
