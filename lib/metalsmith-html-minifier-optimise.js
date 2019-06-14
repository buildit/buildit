/**
 * Metalsmith plug-in that wraps metalsmith-html-minifier to only
 * run if the env has the optimise flag
 */
const debug = require('debug');
const htmlMinifier = require('metalsmith-html-minifier');
const envs = require('../gulp/envs.js');

debug('metalsmith-html-minifier-optimise');

module.exports = (options) => {
  const optimise = envs.getCurrentEnvInfo().optimise || false;
  if (optimise) {
    return htmlMinifier(options);
  }
  return (metalsmith, files, done) => done();
};
