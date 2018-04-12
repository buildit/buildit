# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- New home page design & content
- New about page design & content
- New careers page design & content
- New locations page design & content
- Build-time fetching of job listings from SmartRecruiters (via the `job-listings` lib)
- Animated flourishes
- Animated homepage hero
- Client-side JavaScript transpilation and bundling (using Babel and Rollup)
- JavaScript unit tests using Jest
- ESLint with Prettier

### Changed
- Site build now uses Metalsmith
- Replaced Pug with Handlebars for templates
- Replaced Semantic UI with [Buildit Gravity](https://www.npmjs.com/package/@buildit/gravity-ui-sass)
- Renamed "Find us" / "Contact" page to "Locations"
- Replaced old favicon, icons, etc. with ones using new Buildit logo
- Replaced `npm install` with `npm ci` in `.travis.yml`

### Removed
- Old, unused assets
- Anything to do Pug, Semantic UI and whatever else the old site used


## [0.3.x and earlier] - 2018-01-31
Unfortunately, we did not keep a changelog for these older releases.
