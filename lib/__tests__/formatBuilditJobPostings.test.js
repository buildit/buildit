const formatBuilditJobPostings = require("../formatBuilditJobPostings");

const allJobsData = require("./getBuilditJobPostings.data.json");

describe("formatBuilditJobPostings", () => {
  it("should return a single object for each city", () => {
    const jobLocations = formatBuilditJobPostings(allJobsData);
    expect(jobLocations).toHaveLength(7);
  });

  it("should save the right number of jobs for each city", () => {
    const jobLocations = formatBuilditJobPostings(allJobsData);
    const cities = {
      Dublin: 3,
      Gdańsk: 4,
      London: 5,
      Dallas: 2,
      Denver: 2,
      Houston: 1,
      "New York": 6
    };
    Object.keys(cities).forEach((key, i) => {
      expect(jobLocations[i].jobs).toHaveLength(cities[key]);
    });
  });
});
