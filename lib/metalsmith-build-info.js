/**
 * Metalsmith plug-in that fetches build info.
 */
const debug = require('debug')('metalsmith-build-info');
const getBuildInfo = require('../gulp/get-build-info.js');

module.exports = () => (files, metalsmith, done) => {
  const metadata = metalsmith.metadata();
  metadata.build = metadata.build || {};

  debug('Retrieving build info...');
  getBuildInfo()
    .then((bldInfo) => {
      // Add build info into metadata.build
      Object.assign(metadata.build, bldInfo);
      metalsmith.metadata(metadata);

      // Also, create a build-info.json file
      // eslint-disable-next-line no-param-reassign
      files['build-info.json'] = {
        contents: Buffer.from(JSON.stringify(bldInfo, null, 2)),
      };
      done();
    })
    .catch((err) => {
      debug('Error while retrieving build info: %s', err);
      done(`Error while retrieving build info: ${err}`);
    });
};
