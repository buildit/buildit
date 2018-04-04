/**
 * Metalsmith plug-in that fetches Buildit job postings,
 * groups them by location and adds them to Metalsmith's
 * global metadata as an array called `jobLocations`.
 */
const debug = require('debug')('metalsmith-job-listings');
const jobListings = require('@buildit/job-listings');

module.exports = function plugin() {
  return function(files, metalsmith, done) {
    debug('Fetching Buildit job postings from SmartRecruiters...');
    jobListings.getBuilditJobPostings().then((allJobs) => {
      debug('Received %d job postings successfully', allJobs.length);

      // Group jobs by location
      const jobLocations = allJobs.reduce((accumulator, job) => {
        // See if we already have a jobLocation object we can
        // append to
        let jobLocation = accumulator.find((jl) => {
          return jl.location.city === job.location.city && jl.location.countryCode === job.location.countryCode;
        });
        // Otherwise create a new one and add it to the accumulator
        if (!jobLocation) {
          jobLocation = {
            location: job.location,
            jobs: []
          };
          accumulator.push(jobLocation);
        }

        // Append this job's details to the jobLocation
        jobLocation.jobs.push({
          title: job.title,
          type: job.typeOfEmployment,
          url: job.url
        });

        return accumulator;
      }, []);

      // Sort by country, then city
      jobLocations.sort((a, b) => {
        locationA = `${a.location.country}, ${a.location.city}`;
        locationB = `${b.location.country}, ${b.location.city}`;
        return locationA.localeCompare(locationB);
      });

      metalsmith.metadata({
        jobLocations
      });
      done();
    }).catch((err) => {
      debug('Error while receiving job postings: %s', err);
      done(err);
    });
  }
};
