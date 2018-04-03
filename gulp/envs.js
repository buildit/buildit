const minimist = require('minimist');
const config = require('../config.json');

const envs = config.envs;
const availableEnvs = Object.keys(envs);
const defaultEnv = availableEnvs[0];

const knownOptions = {
  string: 'env',
  default: { env: defaultEnv }
};

const options = minimist(process.argv.slice(2), knownOptions);

module.exports = {

  availableEnvs,

  defaultEnv,

  currentEnv: options.env,

  getEnvInfo: function(env) {
    return envs[env];
  },

  getCurrentEnvInfo: function() {
    return envs[options.env]
  }

};
