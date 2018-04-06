/**
 * Metalsmith plug-in that fetches Buildit job postings,
 * groups them by location and adds them to Metalsmith's
 * global metadata as an array called `jobLocations`.
 */
const debug = require("debug")("metalsmith-job-listings");
const jobListings = require("@buildit/job-listings");
const formatBuilditJobPostings = require("./formatBuilditJobPostings");

module.exports = function plugin() {
  return function(files, metalsmith, done) {
    debug("Fetching Buildit job postings from SmartRecruiters...");
    jobListings
      .getBuilditJobPostings()
      .then(allJobs => {
        metalsmith.metadata({
          jobLocations: formatBuilditJobPostings(allJobs)
        });
        done();
      })
      .catch(err => {
        debug("Error while receiving job postings: %s", err);
        done(err);
      });
  };
};
