const passport = require('passport');
const axios = require('axios');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const boom = require('@hapi/boom');
const { config } = require('../../../config');

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebookClientId,
      clientSecret: config.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    async function (accessToken, refreshToken, profile, done) {
      const email = `${profile.displayName
        .toLowerCase()
        .trim()
        .replace(/ /g, '')}@facebook.com`;
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/v1/auth/sign-provider`,
        method: 'post',
        data: {
          name: profile.displayName,
          email: email,
          password: profile.id,
          apiKeyToken: config.apiKeyToken,
        },
      });

      if (!data || status !== 200) {
        return done(boom.unauthorized(), false);
      }

      return done(null, data);
    }
  )
);
