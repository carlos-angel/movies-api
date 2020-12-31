const passport = require('passport');
const axios = require('axios');
const { get } = require('lodash');
const { Strategy: TwitterStrategy } = require('passport-twitter');
const { config } = require('../../../config');
const boom = require('@hapi/boom');

passport.use(
  new TwitterStrategy(
    {
      consumerKey: config.twitterConsumerKey,
      consumerSecret: config.twitterConsumerSecret,
      callbackUrl: '/auth/twitter/callback',
      includeEmail: true,
    },
    async function (token, tokenSecret, profile, callback) {
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/v1/auth/sign-provider`,
        method: 'post',
        data: {
          name: profile.displayName,
          email: get(
            profile,
            'emails.0.value',
            `${profile.username}@twitter.com`
          ),
          password: profile.id,
          apiKeyToken: config.apiKeyToken,
        },
      });

      if (!data || status !== 200) {
        return callback(boom.unauthorized());
      }
      return callback(null, data);
    }
  )
);
