# Buildit

This is the buildit website.

## Requirements

Node v8.10.0 or higher is required.

If you use [NVM](https://github.com/creationix/nvm) for managing Node, you can just issue the following command to install the right node version

    $ nvm install

and before running any other npm command, run

    $ nvm use

## Build and development

To run it locally just `npm install` then run the `start` script: `npm start`. Local hosting is at http://localhost:8080 and a browser window should open automatically.

To build the static website: `npm run-script build`. Distribution goes into `./dist`.


### Image optimisation
One of the build steps is to optimise any file jpg, png or svg file that is inside `static` and copy it to`dist`.
We use `imagemin` with three different libraries, one for each file type: `moz-jpeg`, `pngquant` and `svgo`.


### Environments

Some of the files produced by the build, for example `sitemap.xml`, need to contain the website's absolute URL. Others, such as `robots.txt`, need to have different contents depending on where the build will be deployed to (so that we can prevent search engines indexing our staging environments).

To facilitate this, multiple environments can be defined in the `envs` section of [`config.json`](./config.json). Both the `npm start` and `npm run-script build` commands support an additional `--env` argument which takes the name of the desired environment for that build as its parameter (note that you need to proceed it with `--` so that `npm` passes that argument through to the underlying build script). For example:

    $ npm run-script build -- --env production

Where `production` corresponds to the key of the desired environment defined in `config.json`:

```js
{
  // ...
  "envs": {

    "production": {

      // The absolute URL that this site is deployed to
      "url": "https://buildit.foo.bar",

      // Whether or not search engine bots should be
      // prevented from indexing this site
      "excludeRobots": true

    },

    "other-env": {
      // ...
    },
    // ...
  },
  // ...
}
```

If no `--env` argument is provided to the builds, then the first environment defined in `config.json` will be used.

## Website technologies

Behind the scenes the website is using the following technologies, so be sure you know what you're doing before starting to change anything.

* [Metalsmith](http://metalsmith.io) for the core of the website,
* [HandlebarJS](https://handlebarsjs.com/) as templating engine,
* [`SCSS`](http://sass-lang.com/), with the addition of
  * [autoprefixer](https://github.com/postcss/autoprefixer)
  * [csso](https://github.com/css/csso)
  * [eyeglass](https://github.com/sass-eyeglass/eyeglass)
* [Cypress](docs/e2e.md), for end-to-end testing

## Design
* [Flourish design elements](docs/flourishes.md) to use, extend or create the flourish component

## Travis CI

### Pipeline

* Any pushed commit got build (`npm run-script build`)
* Any successful build of `master` branch get deployed to Staging
* Any successful build of a Tag matching a valid SemVer pattern (`vX.Y.Z`) (case-sensitive) gets deployed to Production

### Travis CI Setup

Travis CI build expects the following environment variables:

* `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`: AWS credentials used for deploying
* `BETA_BUCKET` and `PROD_BUCKET_REGION`: S3 bucket and Region for Beta environment
* `BETA_DISTRIBUTION_ID`: CloudFront Distribution ID for Beta
* `STAGING_BUCKET` and `STAGING_BUCKET_REGION`: S3 bucket and Region for Staging environment
* `STAGING_DISTRIBUTION_ID`: CloudFront Distribution ID for Staging
* `PROD_BUCKET` and `PROD_BUCKET_REGION`: S3 bucket and Region for Production environment
* `PROD_DISTRIBUTION_ID`: CloudFront Distribution ID for Production

### Deployment

Currently, deployment only means syncing the output of the build (`./dist`) with an S3 bucket.
Deployment also invalidate the CloudFormation cache for all objects in the distribution.

The S3 bucket, DNS, CloudFront etc have to be set up manually.

## Decisions

Decisions linked to implementation details, have not been catalogued. Many of those decisions are now lost.  
Therefore, although late, we have decided to start logging all new decisions. These decisions will now be catalogued in the [Decision Log](docs/DECISIONLOG.md)

## Logs

Currently we are not using CloudWatch or any other system to aggregate logs.  
AWS S3 splits activity logs into several files, which can make it hard to consume and search. The [Log Aggregator Script](./logAggregator.sh) pulls down the logs for a given day and combines them into a file that is easily consumed.

To run the script, simply type  
`$ ./s3LogAggregator.sh`  
and follow the instructions on screen.

The date should be entered in YYYY-mm-dd format (e.g. 2018-03-01), when prompted by the script.
