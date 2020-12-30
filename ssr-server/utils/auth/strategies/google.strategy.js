const passport = require('passport');
const axios = require('axios');
const boom = require('@hapi/boom');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const { config } = require('../../../config');

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, callback) {
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/v1/auth/sign-provider`,
        method: 'post',
        data: {
          name: profile._json.name,
          email: profile._json.email,
          password: profile.id,
          apiKeyToken: config.apiKeyToken,
        },
      });

      if (!data || status !== 200) {
        return callback(boom.unauthorized(), false);
      }
      return callback(null, data);
    }
  )
);
