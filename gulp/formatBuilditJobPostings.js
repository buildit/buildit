const debug = require("debug");

module.exports = function formatBuilditJobPostings(allJobs) {
  debug("Received %d job postings successfully", allJobs.length);

  // Group jobs by location
  const jobLocations = allJobs.reduce((accumulator, job) => {
    // Append slug version of the city name to be used for URIs
    job.location.citySlug = encodeURIComponent(
      job.location.city.toLocaleLowerCase()
    );

    // See if we already have a jobLocation object we can
    // append to
    let jobLocation = accumulator.find(jl => {
      return (
        jl.location.city === job.location.city &&
        jl.location.countryCode === job.location.countryCode
      );
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
    jobLocation.jobs.push(job);

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
