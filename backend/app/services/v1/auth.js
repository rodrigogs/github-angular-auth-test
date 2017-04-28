const redis = require('../../../config/redis');
const env = require('../../../config/env');

const AuthService = {

  saveToken: (token) => {
    redis.set(token, token, 'EX', env.redis_expiry);
  },

  getToken: (token) => {
    return redis.getAsync(token);
  },

};

module.exports = AuthService;
