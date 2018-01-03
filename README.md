# Buildit

This is the buildit website.

To run it locally just `npm install` then run the `start` script: `npm start`. Local hosting is at http://localhost:8080 and a browser window should open automatically.

To build the static website: `npm run-script build`. Distribution goes into `./dist`

## Requirements

node v6.9 or higher is required.


## Travis CI setup

To build on Travis CI setup the following environment variables:

- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`: AWS credentials used for deploying
- `STAGING_BUCKET` and `PROD_BUCKET`: S3 bucket names used for Staging and Prod, respectively

Deploy target:

- Pending PRs are never deployed
- Any commit to `master` not tagged, get deployed to Staging
- Any commit with a Tag matching `rel-*` or `release-*` (case-sensitive) get deployed to Production
- Any other commit is not deployed
