const env = name => process.env[name.toUpperCase()];

module.exports = {

  node_env: env('node_env') || 'development',

  port: env('port') || 9000,

  http_log_config: env('http_log_config') || 'dev',

  github_client_id: env('github_client_id') || '',

  github_client_secret: env('github_client_secret') || '',

  redis: env('redis_url') || 'redis://127.0.0.1:6379',

  redis_expiry: env('redis_expiry') ? Number(env('redis_expiry')) : null || (60 * 60 * 24),

};
