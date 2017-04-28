const AuthService = require('../services/v1/auth');

module.exports = {

  isAuthenticated: () => {
    return (req, res, next) => {
      AuthService
        .getToken(req.headers.token)
        .then((token) => {
          if (token) {
            return next();
          }
          res.status(401).send('Unauthorized');
        });
    };
  },

};
