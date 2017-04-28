const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const env = require('../config/env');

passport.use(new GitHubStrategy({
  clientID: env.github_client_id,
  clientSecret: env.github_client_secret,
  callbackURL: 'v1/auth/callback',
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, accessToken);
}));

module.exports = passport;
