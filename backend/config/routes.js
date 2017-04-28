const express = require('express');

const router = express.Router();
const v1Router = express.Router();

const routes = {
  basePath: '../app/routes',
  base: name => require(`${routes.basePath}/${name}`),
  v1: name => require(`${routes.basePath}/v1/${name}`),
};

const GeneralMiddleware = require('../app/middlewares/general');
const AuthMiddleware = require('../app/middlewares/auth');

const ignore = paths => new RegExp(`^(?!${paths.map(path => `(${path})$`).join('|')})`);

router.use(GeneralMiddleware());
router.all(ignore([
  '/',
  '/v1/auth/login',
  '/v1/auth/callback',
]), AuthMiddleware.isAuthenticated());

v1Router.use('/auth', routes.v1('auth'));

router.use('/', routes.base('index'));
router.use('/v1', v1Router);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
router.use((err, req, res, next) => {
  if (!err) {
    return next();
  }
  const message = err.message;
  const error = req.app.get('env') === 'development' ? err : {};

  res
    .status(err.status || 500)
    .json({ message, error });
});

module.exports = router;
