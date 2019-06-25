const {
  byCity,
  byCountry,
  byJobTitle,
  byCountryAndCity,
} = require('../formatBuilditJobPostings');

const allJobsData = require('./getBuilditJobPostings.data.json');

describe('byCity', () => {
  it('should return an object with a key for each city', () => {
    const jobsByCity = byCity(allJobsData);
    expect(Object.keys(jobsByCity)).toHaveLength(7);
  });

  it('should return the right number of jobs for each city', () => {
    const jobsByCity = byCity(allJobsData);
    const cities = {
      Dublin: 3,
      Gdańsk: 4,
      London: 5,
      Dallas: 2,
      Denver: 2,
      Houston: 1,
      'New York': 6,
    };
    Object.keys(jobsByCity).forEach((cityName) => {
      expect(jobsByCity[cityName]).toHaveLength(cities[cityName]);
    });
  });
});

describe('byCountry', () => {
  it('should return an object with a key for each country', () => {
    const jobsByCountry = byCountry(allJobsData);
    expect(Object.keys(jobsByCountry)).toHaveLength(4);
  });

  it('should return the right number of jobs for each country', () => {
    const jobsByCountry = byCountry(allJobsData);
    const countries = {
      Ireland: 3,
      Poland: 4,
      'United Kingdom': 5,
      'United States': 11,
    };
    Object.keys(jobsByCountry).forEach((countryName) => {
      expect(jobsByCountry[countryName]).toHaveLength(countries[countryName]);
    });
  });
});

describe('byJobTitle', () => {
  it('should return an object with a key for each country', () => {
    const jobsByJobTitle = byJobTitle(allJobsData);
    expect(Object.keys(jobsByJobTitle)).toHaveLength(15);
  });

  it('should return the right number of jobs for each country', () => {
    const jobsByJobTitle = byJobTitle(allJobsData);
    const jobTitles = {
      'Creative Technologist': 1,
      'Delivery Lead': 1,
      'DevOps Engineer': 1,
      'Front End Engineer': 4,
      'Full Stack Engineer': 1,
      'Head of Engineering': 1,
      'Lead Platform Engineer': 1,
      'Platform Engineer': 5,
      'Senior Android Engineer': 1,
      'Senior Android Engineer (contract)': 1,
      'Senior Front End Engineer': 2,
      'Senior iOS Engineer': 1,
      'Senior iOS Engineer (contract)': 1,
      'Senior Platform Engineer': 1,
      'Software Engineer': 1,
    };

    Object.keys(jobsByJobTitle).forEach((jobTitle) => {
      expect(jobsByJobTitle[jobTitle]).toHaveLength(jobTitles[jobTitle]);
    });
  });
});

describe('byCountryAndCity', () => {
  it('should return an object with a key for each country', () => {
    const jobsByCountryAndCity = byCountryAndCity(allJobsData);
    expect(Object.keys(jobsByCountryAndCity)).toHaveLength(4);
  });

  it('should return an object with nested objects for each city in a country', () => {
    const jobsByCountryAndCity = byCountryAndCity(allJobsData);
    const citiesPerCountry = {
      Ireland: 1, // Dublin
      Poland: 1, // Gdańsk
      'United Kingdom': 1, // London
      'United States': 4, // Dallas, Denver, Houston & New York
    };

    Object.keys(jobsByCountryAndCity).forEach((countryName) => {
      expect(Object.keys(jobsByCountryAndCity[countryName])).toHaveLength(
        citiesPerCountry[countryName],
      );
    });
  });

  it('should return the right number of jobs per city', () => {
    const jobsByCountryAndCity = byCountryAndCity(allJobsData);
    const cities = {
      Dublin: 3,
      Gdańsk: 4,
      London: 5,
      Dallas: 2,
      Denver: 2,
      Houston: 1,
      'New York': 6,
    };

    Object.keys(jobsByCountryAndCity).forEach((countryName) => {
      const jobsByCity = jobsByCountryAndCity[countryName];
      Object.keys(jobsByCity).forEach((cityName) => {
        expect(jobsByCity[cityName]).toHaveLength(cities[cityName]);
      });
    });
  });
});
