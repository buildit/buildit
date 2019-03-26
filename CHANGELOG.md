## [4.4.2](https://github.com/buildit/buildit/compare/v4.4.1...v4.4.2) (2019-03-26)


### Bug Fixes

* pin eyeglass to 2.2.1 ([cca5a2b](https://github.com/buildit/buildit/commit/cca5a2b))
* **homepage:** fixes broken hamburger menu ([78003f8](https://github.com/buildit/buildit/commit/78003f8))
* **homepage:** fixes logo positioning in header ([e7b9a31](https://github.com/buildit/buildit/commit/e7b9a31))
* **locations:** fixes Plano studio title ([662da77](https://github.com/buildit/buildit/commit/662da77))
* **locations:** updates Denver studio address ([91c2236](https://github.com/buildit/buildit/commit/91c2236))

## [4.4.1](https://github.com/buildit/buildit/compare/v4.4.0...v4.4.1) (2019-03-25)


### Bug Fixes

* **locations:** fixes Plano studio title ([b01aed5](https://github.com/buildit/buildit/commit/b01aed5))
* **locations:** updates Denver studio address ([e17dcff](https://github.com/buildit/buildit/commit/e17dcff))
* pin eyeglass to 2.2.1 ([b628f8f](https://github.com/buildit/buildit/commit/b628f8f))

# [4.4.0](https://github.com/buildit/buildit/compare/v4.3.1...v4.4.0) (2019-03-18)


### Bug Fixes

* switched dependency due to issue with subdependency ([5b9d574](https://github.com/buildit/buildit/commit/5b9d574))


### Features

* adds Schema.org place meta-data to locations page ([5819024](https://github.com/buildit/buildit/commit/5819024))
* adds Schema.org RDFa data to job listings ([9062837](https://github.com/buildit/buildit/commit/9062837))
* adds Schema.org RDFa data to page header & footer ([4cf20f0](https://github.com/buildit/buildit/commit/4cf20f0))

## [4.3.1](https://github.com/buildit/buildit/compare/v4.3.0...v4.3.1) (2019-03-11)


### Bug Fixes

* **travis:** production was using the wrong release script ([4afd8c4](https://github.com/buildit/buildit/commit/4afd8c4))

# [4.3.0](https://github.com/buildit/buildit/compare/v4.2.0...v4.3.0) (2019-03-11)


### Bug Fixes

* **locations:** renames Dallas to Plano ([b315b79](https://github.com/buildit/buildit/commit/b315b79))


### Features

* **analytics:** switch to GTM and track smart recruiters links ([1cf2187](https://github.com/buildit/buildit/commit/1cf2187))
* **careers:** adds talent team email links ([0e14695](https://github.com/buildit/buildit/commit/0e14695))
* **commits:** support for commitizen formatted commits ([cfd4f21](https://github.com/buildit/buildit/commit/cfd4f21))
* **semantic-release:** added semantic now runs on `master` branch ([a4d8f57](https://github.com/buildit/buildit/commit/a4d8f57))


## [4.2.0](https://github.com/buildit/buildit/compare/v4.1.4...v4.2.0) (2019-01-15)
### Changed
- Upgraded to Gravity v0.11.0
- Upgraded dev dependencies
- Travis builds now use Node version specified in .nvmrc
- Enabled [Greenkeeper](https://greenkeeper.io/) to automatically update depencies
- `scrollreveal` is now included in our JS bundle, instead of being loaded via CDN
- Updated Warsaw studio address

### Fixed
- `scrollreveal` is no longer incorrectly listed as a (non-dev) dependency
- Removed unused dependencies


## [4.1.4](https://github.com/buildit/buildit/compare/v4.1.3...v4.1.4) (2018-10-23)
### Fixed
- Corrected capitalisation of "Buildit @ Wipro Digital" text


## [4.1.3](https://github.com/buildit/buildit/compare/v4.1.2...v4.1.3) (2018-09-24)
### Fixed
- Fixes a typo on the home page 

### Added
- Dallas office to locations page


## [4.1.2](https://github.com/buildit/buildit/compare/v4.1.1...v4.1.2) (2018-08-16)
### Added
- Warsaw office to locations page

### Fixed
- Marker locations and alt texts of map previews on locations page


## [4.1.1](https://github.com/buildit/buildit/compare/v4.1.0...v4.1.1) (2018-06-21)
### Updated
- Travis file to trigger a daily production build

## [4.1.0](https://github.com/buildit/buildit/compare/v4.0.2...v4.1.0) (2018-06-07)
### Added
- Privacy policy link in footer

### Changed
- Updated Matteo's role in humans.txt credits.
- Enabled Google Analytics IP anonymisation flag

### Updated
- Upgraded to Gravity `v0.10.0` and updated header & footer HTML accordingly

### Fixed
- WEB-261: Math.hypot fallback for IE in hero


## [4.0.2](https://github.com/buildit/buildit/compare/v4.0.1...v4.0.2) (2018-05-18)
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


## [4.0.1](https://github.com/buildit/buildit/compare/v4.0.0...v4.0.1) (2018-05-07)
### Fixed
- WEB-236: `.travis.yml` now builds production site with correct configuration.


## [4.0.0](https://github.com/buildit/buildit/compare/v0.3.8...v4.0.0) (2018-05-03)
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
