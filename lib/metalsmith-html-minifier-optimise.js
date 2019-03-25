/**
 * Metalsmith plug-in that wraps metalsmith-html-minifier to only run if the env has the optimise flag
 */
const debug = require("debug")("metalsmith-html-minifier-optimise");
const htmlMinifier = require("metalsmith-html-minifier");
const envs = require("../gulp/envs.js");

module.exports = options => {
  const optimise = envs.getCurrentEnvInfo().optimise || false;
  if (optimise) {
    return htmlMinifier(options);
  } else {
    return (metalsmith, files, done) => done();
  }
};
