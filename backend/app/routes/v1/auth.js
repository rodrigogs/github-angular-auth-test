const express = require('express');
const controller = require('../../controllers/v1/auth');

const router = express.Router();

router
  .route('/login')
  .get(controller.login);

router
  .route('/callback')
  .get(controller.callback);

router
  .route('/check')
  .post(controller.check);

module.exports = router;
