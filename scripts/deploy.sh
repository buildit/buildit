#!/bin/bash
# Deploy to S3 bucket and invalidate CloudFront Distribution cache (production only)

TARGET=$1
echo "Deploy to $TARGET"

case $TARGET in
    staging)
        TARGET_BUCKET=$STAGING_BUCKET
        TARGET_BUCKET_REGION=$STAGING_BUCKET_REGION
        DISTRIBUTION_ID=""
        ;;
    production)
        TARGET_BUCKET=$PROD_BUCKET
        TARGET_BUCKET_REGION=$PROD_BUCKET_REGION
        DISTRIBUTION_ID=$PROD_DISTRIBUTION_ID
        ;;
    *)
        echo "Unknown or unspecified target $TARGET"
        exit 1
esac

echo "Deploy to S3 bucket ${TARGET_BUCKET}, Region ${TARGET_BUCKET_REGION}"
~/.local/bin/aws s3 sync dist s3://${TARGET_BUCKET} --delete --region=${TARGET_BUCKET_REGION}

if [ -n "$DISTRIBUTION_ID" ]; then
    echo "Create an Invalidation for Distribution ${DISTRIBUTION_ID}"
    ~/.local/bin/aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths /*    
fi
