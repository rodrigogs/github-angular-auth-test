
const path = require('path');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const helmet = require('helmet');
const passport = require('passport');
const env = require('./config/env');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(morgan(env.http_log_config, { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(passport.initialize());

require('./config/bluebird');
require('./config/passport');

app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(require('./config/routes'));

http.createServer(app).listen(env.port, () => {
  logger.info(`HTTP server worker listening on port ${env.port}`);
});

module.exports = app;
