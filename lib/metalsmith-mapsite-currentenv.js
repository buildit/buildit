/**
 * Metalsmith plug-in that wraps metalsmith-mapsite to take it's hostname from the current environment
 */
const debug = require("debug")("metalsmith-mapsite-currentenv");
const mapsite = require("metalsmith-mapsite");
const envs = require("../gulp/envs.js");

module.exports = options => {
  options = Object.assign(options, { hostname: envs.getCurrentEnvInfo().url });
  return mapsite(options);
};
