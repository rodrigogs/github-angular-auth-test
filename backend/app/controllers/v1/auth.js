const passport = require('passport');
const AuthService = require('../../services/v1/auth');

const AuthController = {

  login: passport.authenticate('github'),

  callback: (req, res, next) => {
    passport.authenticate('github', { failureRedirect: 'v1/auth/login', session: false }, (err, token) => {
      AuthService.saveToken(token);
      res.redirect(`http://localhost:3000/#!/token/${token}`);
    })(req, res, next);
  },

  check: (req, res) => {
    res.status(200).send('Oh yeah!');
  },

};

module.exports = AuthController;
