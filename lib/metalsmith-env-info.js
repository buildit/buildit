/**
 * Metalsmith plug-in that fetches environment info.
 */
const debug = require("debug")("metalsmith-env-info");
const envs = require("../gulp/envs.js");

module.exports = options =>
  function(files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    metadata.env = metadata.env || {};

    debug("Retrieving env info...");
    Object.assign(metadata.env, envs.getCurrentEnvInfo());
    metalsmith.metadata(metadata);
    done();
  };
