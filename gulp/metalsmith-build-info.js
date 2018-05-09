/**
 * Metalsmith plug-in that fetches build info.
 */
const debug = require("debug")("metalsmith-build-info");
const getBuildInfo = require("./get-build-info.js");

module.exports = function plugin() {
  return function(files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    metadata.build = metadata.build || {};

    debug("Retrieving build info...");
    getBuildInfo()
      .then(bldInfo => {
        // Add build info into metadata.build
        Object.assign(metadata.build, bldInfo);
        metalsmith.metadata(metadata);

        // Also, create add a build-info.json file
        files["build-info.json"] = {
          contents: new Buffer(JSON.stringify(bldInfo, null, 2))
        };

        done();
      })
      .catch(err => {
        debug("Error while retrieving build info: %s", err);
        done(err);
      });
  };
};
