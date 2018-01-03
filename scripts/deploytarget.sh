#!/bin/bash
# Set the target S3 bucket for deployment, if any

# Expects:
# - PROD_BUCKET, STAGING_BUCKET: S3 bucket names
# Exports:
# - DEPLOY_TARGET: target S3 bucket or undefined

PR=${TRAVIS_PULL_REQUEST:-false}

# Regexp for Tags for deployment to Prod
PROD_TAG_REGEXP="^rel(ease)?-.+$"

# Makes regexp matching case-insensitive
shopt -s nocasematch

if [[ "$PR" != false ]]; then
  echo "Never deploy a PR"
elif [[ $TRAVIS_BRANCH == 'master' ]] && [[ -n "$STAGING_BUCKET" ]]; then
  echo "Deploy master to Staging"
  export DEPLOY_TARGET="$STAGING_BUCKET"
elif [[ $TRAVIS_TAG =~ $PROD_TAG_REGEXP ]] && [[ -n "$PROD_BUCKET" ]]; then
  echo "Deploy tag $TRAVIS_TAG to Production"
  export DEPLOY_TARGET="$PROD_BUCKET"
fi

if [[ -n "$DEPLOY_TARGET" ]]; then
  echo "Deploy to: $DEPLOY_TARGET"
else
  echo "Do not deploy"
fi

# Switch back the default Bash behaviour
shopt -u nocasematch
