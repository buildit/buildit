# Build and deployment pipeline

## Pipeline

* Any pushed commit got build (`npm run-script build`)
* Any successful build of `master` branch get deployed to Staging
* Any successful build of a Tag matching a valid SemVer pattern (`vX.Y.Z`) (case-sensitive) gets deployed to Production

## Automatic Daily build

There is a daily cron job set up on Travis that is going to generate a production build from the latest release.

Travis settings page for the website can be found here: [travis-ci.org/buildit/buildit/settings](https://travis-ci.org/buildit/buildit/settings)

### Note
This is a quick solution to update the job listings page.



## Travis CI Setup

Travis CI build expects the following environment variables:

* `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`: AWS credentials used for deploying
* `STAGING_BUCKET` and `STAGING_BUCKET_REGION`: S3 bucket and Region for Staging environment
* `STAGING_DISTRIBUTION_ID`: CloudFront Distribution ID for Staging
* `PROD_BUCKET` and `PROD_BUCKET_REGION`: S3 bucket and Region for Production environment
* `PROD_DISTRIBUTION_ID`: CloudFront Distribution ID for Production


## Deployment

Currently, deployment only means syncing the output of the build (`./dist`) with an S3 bucket.
Deployment also invalidate the CloudFormation cache for all objects in the distribution.

The S3 bucket, DNS, CloudFront etc have to be set up manually.


## Logs

Currently we are not using CloudWatch or any other system to aggregate logs.  
AWS S3 splits activity logs into several files, which can make it hard to consume and search. The [Log Aggregator Script](./logAggregator.sh) pulls down the logs for a given day and combines them into a file that is easily consumed.

To run the script, simply type  
`$ ./s3LogAggregator.sh`  
and follow the instructions on screen.

The date should be entered in YYYY-mm-dd format (e.g. 2018-03-01), when prompted by the script.
