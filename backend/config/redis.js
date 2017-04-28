const redis = require('redis');
const env = require('../config/env');
const logger = require('./logger');
const Promise = require('./bluebird');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(env.redis);

client.on('ready', () => logger.info('Redis client is ready'));
client.on('connect', () => logger.info('Redis client connected'));
client.on('reconnecting', () => logger.info('Redis client reconnecting...'));
client.on('error', err => logger.error(`Redis error: ${err}`));
client.on('end', () => logger.error('Redis connection closed'));

process.on('SIGINT', () => client.quit());

module.exports = client;
