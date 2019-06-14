/**
 * Metalsmith plug-in that wraps metalsmith-mapsite to take it's
 * hostname from the current environment
 */
const debug = require('debug');
const mapsite = require('metalsmith-mapsite');
const envs = require('../gulp/envs.js');

debug('metalsmith-mapsite-currentenv');

module.exports = (options) => {
  const optionsMap = Object.assign(options, { hostname: envs.getCurrentEnvInfo().url });
  return mapsite(optionsMap);
};
