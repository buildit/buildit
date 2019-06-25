/**
 * Groups jobs by one the job object's properties and returns
 * the result as an object whose keys are that property's values,
 * each with an arrays of jobs in that have that value for the
 * chosen property.
 *
 * Note that the order of the keys is
 * unpredictable.
 */
function groupJobsBy(jobs, propertyGetterFn) {
  return jobs.reduce((accumulator, job) => {
    const propVal = propertyGetterFn(job);

    // Get the array of jobs for this property
    let propJobs = accumulator[propVal];
    if (propJobs === undefined) {
      // None exists yet, so start a new array
      propJobs = [];
    }

    // Add job to this property's array
    propJobs.push(job);
    accumulator[propVal] = propJobs;
    return accumulator;
  }, {});
}

/**
 * Groups jobs by city and returns the result as an
 * object whose keys are the city names and values are
 * arrays of jobs in that city.
 *
 * Note that the order of the keys (i.e. city names) is
 * unpredictable. Templates should use the `dictsort` filter
 * if they want sort the key - value pairs.
 */
function byCity(jobs) {
  return groupJobsBy(jobs, job => job.location.city);
}

/**
 * Groups jobs by country and returns the result as an
 * object whose keys are the country names and values are
 * arrays of jobs in that country.
 *
 * Note that the order of the keys (i.e. country names) is
 * unpredictable. Templates should use the `dictsort` filter
 * if they want sort the key - value pairs.
 */
function byCountry(jobs) {
  return groupJobsBy(jobs, job => job.location.country);
}

/**
 * Groups jobs by job title and returns the result as an
 * object whose keys are the job titles and values are
 * arrays of jobs with that title.
 *
 * Note that the order of the keys (i.e. job titles) is
 * unpredictable. Templates should use the `dictsort` filter
 * if they want sort the key - value pairs.
 */
function byJobTitle(jobs) {
  return groupJobsBy(jobs, job => job.title);
}

/**
 * Groups jobs by country and then by city and returns the
 * result as an object with that structure.
 *
 * Note that the order of the keys is unpredictable.
 * Templates should use the `dictsort` filter if they want sort the
 * key - value pairs.
 */
function byCountryAndCity(jobs) {
  const jobsByCountry = byCountry(jobs);
  Object.keys(jobsByCountry).forEach((country) => {
    const countryJobs = jobsByCountry[country];
    jobsByCountry[country] = byCity(countryJobs);
  });
  return jobsByCountry;
}

module.exports = {
  byCity,
  byCountry,
  byJobTitle,
  byCountryAndCity,
};
