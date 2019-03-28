const minimist = require("minimist");
const envs = require("../config/envs.json");
const availableEnvs = Object.keys(envs);
const defaultEnv = availableEnvs[0];

const knownOptions = {
  string: "env",
  default: { env: defaultEnv }
};

const options = minimist(process.argv.slice(2), knownOptions);

module.exports = {
  availableEnvs,

  defaultEnv,

  currentEnv: options.env,

  shouldOptimise: function() {
    return this.getCurrentEnvInfo()["optimise"] || false;
  },

  getEnvInfo: function(env) {
    return envs[env];
  },

  getCurrentEnvInfo: function() {
    return envs[options.env];
  }
};
