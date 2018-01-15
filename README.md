# Buildit

This is the buildit website.

To run it locally just `npm install` then run the `start` script: `npm start`. Local hosting is at http://localhost:8080 and a browser window should open automatically.

To build the static website: `npm run-script build`. Distribution goes into `./dist`

## Requirements

node v6.9 or higher is required.


## Travis CI

### Pipeline

- Any pushed commit got build (`npm run-script build`)
- Any successful build of `master` branch get deployed to Staging
- Any successful build of a Tag  matching the pattern `rel-*` or `release-*` (case-sensitive) get deployed to Production

### Travis CI Setup

Travis CI build expects the following environment variables:

- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`: AWS credentials used for deploying
- `BETA_BUCKET` and `PROD_BUCKET_REGION`: S3 bucket and Region for Beta environment
- `BETA_DISTRIBUTION_ID`: CloudFront Distribution ID for Beta
- `STAGING_BUCKET` and `STAGING_BUCKET_REGION`: S3 bucket and Region for Staging environment
- `STAGING_DISTRIBUTION_ID`: CloudFront Distribution ID for Staging
- `PROD_BUCKET` and `PROD_BUCKET_REGION`: S3 bucket and Region for Production environment
- `PROD_DISTRIBUTION_ID`: CloudFront Distribution ID for Production


### Deployment

Currently, deployment only means sync'ing the output of the build (`./dist`) with an S3 bucket.
Deployment also invalidate the CloudFormation cache for all objects in the distribution.

The S3 bucket, DNS, CloudFront etc have to be set up manually.
