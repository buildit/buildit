module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/scripts/**/*.js', 'gulp/**/*.js'],
  coverageDirectory: 'src/scripts/coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  transformIgnorePatterns: ['/node_modules/(?!(gsap|lodash-es))/'],
};
