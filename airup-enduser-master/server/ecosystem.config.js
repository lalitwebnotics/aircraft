module.exports = {
  apps : [{
    name: 'aircraft-upgrade-api',
    script: './build/bundle.js',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_development: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    development : {
      user : 'ubuntu',
      host : '18.216.16.228',
      key  : '../keys/aircraft_ohio.pem',
      ref  : 'origin/master',
      repo : 'git@github.com:ronaldborla/aircraft-upgrade-api.git',
      path : '/home/ubuntu/aircraft-upgrade/development/api',
      'post-deploy' : './bin/post-deploy-development'
    },
    production : {
      user : 'ubuntu',
      host : '18.216.16.228',
      key  : '../keys/aircraft_ohio.pem',
      ref  : 'origin/production',
      repo : 'git@github.com:ronaldborla/aircraft-upgrade-api.git',
      path : '/home/ubuntu/aircraft-upgrade/production/api',
      'post-deploy' : './bin/post-deploy-production'
    }
  }
};
