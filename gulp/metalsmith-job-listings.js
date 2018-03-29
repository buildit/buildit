/**
 * Metalsmith plug-in that fetches Buildit job postings
 * and adds them to Metalsmith's global metadata as an
 * array called `jobListings`.
 */
const debug = require('debug')('metalsmith-job-listings');
const jobListings = require('@buildit/job-listings');

module.exports = function plugin() {
  return function(files, metalsmith, done) {
    debug('Fetching Buildit job postings from SmartRecruiters...');
    jobListings.getBuilditJobPostings().then((jobs) => {
      debug('Received %d job postings successfully', jobs.length);
      metalsmith.metadata({
        jobListings: jobs
      });
      done();
    }).catch((err) => {
      debug('Error while receiving job postings: %s', err);
      done(err);
    });
  }
};
