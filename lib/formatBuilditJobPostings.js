const debug = require('debug');

module.exports = function formatBuilditJobPostings(allJobs) {
  debug('Received %d job postings successfully', allJobs.length);

  // Group jobs by location
  const jobLocations = allJobs.reduce((accumulator, job) => {
    const newJob = job;
    // Append slug version of the city name to be used for URIs
    newJob.location.citySlug = encodeURIComponent(
      newJob.location.city.toLocaleLowerCase(),
    );

    // See if we already have a jobLocation object we can
    // append to
    let jobLocation = accumulator.find(jl => (
      jl.location.city === newJob.location.city
        && jl.location.countryCode === newJob.location.countryCode
    ));
    // Otherwise create a new one and add it to the accumulator
    if (!jobLocation) {
      jobLocation = {
        location: newJob.location,
        jobs: [],
      };
      accumulator.push(jobLocation);
    }

    // Append this job's details to the jobLocation
    jobLocation.jobs.push(newJob);

    return accumulator;
  }, []);

  // Sort by country, then city
  jobLocations.sort((a, b) => {
    const locationA = `${a.location.country}, ${a.location.city}`;
    const locationB = `${b.location.country}, ${b.location.city}`;
    return locationA.localeCompare(locationB);
  });

  return jobLocations;
};
