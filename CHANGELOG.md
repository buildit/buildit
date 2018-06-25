# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]


## [4.1.1] - 2018-06-21
### Updated
- Travis file to trigger a daily production build

## [4.1.0] - 2018-06-07
### Added
- Privacy policy link in footer

### Changed
- Updated Matteo's role in humans.txt credits.
- Enabled Google Analytics IP anonymisation flag

### Updated
- Upgraded to Gravity `v0.10.0` and updated header & footer HTML accordingly

### Fixed
- WEB-261: Math.hypot fallback for IE in hero


## [4.0.2] - 2018-05-18
### Added
- Robots meta tags to control indexing of pages
- Dynamically generated `humans.txt` file
- WEB-247: Embedding build info into build output

### Changed
- WEB-229: Cropping at bottom of hero
- WEB-221: Changed debounce js to an npm dependency
- WEB-251: About page partner logos styling - logos changed to boxed versions + added GA tracking

### Updated
- Travis script to run daily cron job against latest tag

### Fixed
- WEB-248 & WEB-249: Flourishes no longer cause gap below footer and janky scrolling on careers page.
- WEB-198: Soft scrolling on in-page jump links is actually soft now.

### Removed
- WEB-257: CDN scripts removed where not needed


## [4.0.1] - 2018-05-07
### Fixed
- WEB-236: `.travis.yml` now builds production site with correct configuration.


## [4.0.0] - 2018-05-03
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
- [Cypress](https://www.cypress.io/) integration tests
- [Pa11y](http://pa11y.org/) accessibility tests
- ESLint with Prettier
- Templated `robots.txt` that can be configured per deployment environment
- Image optimisation task
- Client bundle minification through Google's Closure Compiler
- Critical CSS optimisation

### Changed
- Site build now uses Metalsmith
- Replaced Pug with Handlebars for templates
- Replaced Semantic UI with [Buildit Gravity](https://www.npmjs.com/package/@buildit/gravity-ui-sass)
- Renamed "Find us" / "Contact" page to "Locations"
- Replaced old favicon, icons, etc. with ones using new Buildit logo
- Replaced `npm install` with `npm ci` in `.travis.yml`
- All location map top level domains aligned to .com

### Removed
- Old, unused assets
- Anything to do Pug, Semantic UI and whatever else the old site used

## [0.3.x and earlier] - 2018-01-31
Unfortunately, we did not keep a changelog for these older releases.
