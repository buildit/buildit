const minimist = require('minimist');
const envs = require('../config/envs.json');

const availableEnvs = Object.keys(envs);
const defaultEnv = availableEnvs[0];

const knownOptions = {
  string: 'env',
  default: { env: defaultEnv },
};

const options = minimist(process.argv.slice(2), knownOptions);

module.exports = {
  availableEnvs,

  defaultEnv,

  currentEnv: options.env,

  shouldOptimise() {
    return this.getCurrentEnvInfo().optimise || false;
  },

  getEnvInfo(env) {
    return envs[env];
  },

  getCurrentEnvInfo() {
    return envs[options.env];
  },
};
