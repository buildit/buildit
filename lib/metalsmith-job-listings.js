/**
 * Metalsmith plug-in that fetches Buildit job postings,
 * groups them by location and adds them to Metalsmith's
 * global metadata as an array called `jobLocations`.
 */
const debug = require('debug')('metalsmith-job-listings');
const jobListings = require('@buildit/job-listings');
const formatBuilditJobPostings = require('./formatBuilditJobPostings');

module.exports = function plugin() {
  return (files, metalsmith, done) => {
    const metadata = metalsmith.metadata();

    debug('Fetching Buildit job postings from SmartRecruiters...');
    jobListings
      .getBuilditJobPostings()
      .then((allJobs) => {
        debug('Received %d job postings successfully', allJobs.length);

        // Add job listings to existing metadata
        Object.assign(metadata, {
          jobsByCountryAndCity: formatBuilditJobPostings.byCountryAndCity(
            allJobs,
          ),
          jobsByCountry: formatBuilditJobPostings.byCountry(allJobs),
          jobsByCity: formatBuilditJobPostings.byCity(allJobs),
          jobsByTitle: formatBuilditJobPostings.byJobTitle(allJobs),
        });

        metalsmith.metadata(metadata);
        done();
      })
      .catch((err) => {
        debug('Error while receiving job postings: %s', err);
        done(err);
      });
  };
};
