const passport = require('passport');
const axios = require('axios');
const { OAuth2Strategy } = require('passport-oauth');
const { config } = require('../../../config');
const boom = require('@hapi/boom');

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_URSERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

const oauth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: GOOGLE_AUTHORIZATION_URL,
    tokenURL: GOOGLE_TOKEN_URL,
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: '/auth/google-oauth/callback',
  },
  async function (accessToken, refreshToken, profile, callback) {
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/v1/auth/sign-provider`,
      method: 'post',
      data: {
        name: profile.name,
        email: profile.email,
        password: profile.id,
        apiKeyToken: config.apiKeyToken,
      },
    });

    if (!data || status !== 200) {
      return callback(boom.unauthorized());
    }

    return callback(null, data);
  }
);

oauth2Strategy.userProfile = function (accessToken, done) {
  this._oauth2.get(GOOGLE_URSERINFO_URL, accessToken, (err, body) => {
    if (err) {
      return done(err);
    }
    try {
      const { sub, name, email } = JSON.parse(body);
      const profile = {
        id: sub,
        name,
        email,
      };

      done(null, profile);
    } catch (error) {
      done(error);
    }
  });
};

passport.use('google-oauth', oauth2Strategy);
