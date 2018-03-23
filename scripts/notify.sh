#!/bin/bash
if [[ ${1} =~ (${4}) ]]; then 
    echo "Sending Slack Notification";
    curl -X POST --data-urlencode 'payload={"text": "A successful deployment occurred with tag '"${1}"' for project '"${2}"' "}"' ${3}; 
else 
    echo "No need to send notifaction";
fi