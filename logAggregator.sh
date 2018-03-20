#!/bin/bash

function isDateValid {
    date_var=$1;

    if [[ $date_var =~ ^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$ ]]; then
        if date --date "$ymd" >/dev/null 2>&1; then
            echo "Date Valid! Proceeding...";
            return 0;
        else
            echo "Date is Invalid! Please fix";
            return 1;
        fi
    else
        echo "Date $date_var is not in the correct format: YYYY-mm-dd";
        return 1;
    fi
}

function getDateForAWS {
    date_var=$1
    if isDateValid $date_var; then
        echo "Date $date_var is not in the correct format: YYYY-mm-dd";
    fi
    
    if [[ $DATE =~ ^20[0-9]{2}-[0-1][0-12]-[0-3]{1,2}$ ]]; then
        echo "Passed 1st Validation";
        year=`echo $DATE | cut -d'-' -f1`;
        month=`echo $DATE | cut -d'-' -f2`;
        day=`echo $DATE | cut -d'-' -f3`;

        if [ "$month" == "1" ]; then
            month="01";
        elif [ "$month" == "2" ]; then
            month="02"
        elif [ "$month" == "3" ]; then
            month="03  "
        elif [ "$month" == "4" ]; then
            month="04"
        elif [ "$month" == "5" ]; then
            month="05"
        elif [ "$month" == "6" ]; then
            month="06"
        elif [ "$month" == "7" ]; then
            month="07"
        elif [ "$month" == "8" ]; then
            month="08"
        elif [ "$month" == "9" ]; then
            month="09"
        fi

        ymd=$year"-"$month"-"$day
        echo "ymd: "$ymd
        if date --date "$ymd" >/dev/null 2>&1; then
            echo "Date Valid! Proceeding...";
            return 0;
        else
            echo "Date is Invalid! Please fix";
            return 1;
        fi
    else
        echo "Date $DATE is not in the correct format"
        return 1
    fi
}

function run_log_pull {
    aws_date=$1;
    log_folder="aws_logs_$aws_date"
    mkdir -p "${log_folder}"
    echo "Starting Sync into $log_folder"
    echo "" aws s3 sync $2 "./${log_folder}" --delete --exclude \'*\' --include \'*$aws_date*\'
    aws s3 sync $2 "./${log_folder}" --delete --exclude '*' --include "\'*$aws_date*\'" --exclude 'FullLog_*.txt' 
}

function run_log_join {
    aws_date=$1;
    log_folder="aws_logs_$aws_date"
    mkdir -p "${log_folder}/combined_logs"
    cd "$log_folder";
    touch ./combined_logs/FullLog_${aws_date}.txt
    i=0
    for fle in ./*${aws_date}* ; do
        echo $(i=i+1);
        if [ -f $fle ]; then
            while IFS='' read -r line || [[ -n "$line" ]]; do
                echo "3: $line" 
                echo "$line" >> ./combined_logs/FullLog_${aws_date}.txt
            done < $fle
        fi
    done
    #    done < <(find . -maxdepth 1 -iname "*$1*" )
}

echo "============================== AWS Log Sync Start ==========================================="
echo "Info:"
echo "This script assumes you have aws tools installed and configured correctly (inc. access keys)."
echo "If you do not, you must download and configure aws CLI."
echo " "
echo "============================================================================================"
echo "Please bear in mind, if you are investigating for issues around midnight, the majority of "
echo "these requests may be in the logs after the day you are currently investigating, due to AWS."
echo "Note:"
echo "The script can take up to 2 minutes of what seems like idle time, this is AWS filtering out "
echo "all the logs to only download the specified ones. S.A.F."
echo " "
echo "============================================================================================"
echo " "
read -p "To start, please enter the date in format: YYYY-MM-dd : "  answer;
# DATE=`date +%Y-%m-%d` # current date `date '+%Y-%m-%d %H:%M:%S'`

declare s3_bucket=$1;
declare aws_date;
if [[ -z ${s3_bucket} ]]; then
    echo "User has NOT overridden S3 bucket set"
    s3_bucket="s3://buildit.wiprodigital.com-logs/logs/buildit.wiprodigital.com/"
fi
if [[ $answer =~ ^20[0-9]{2}-[0-1]?[0-9]-[0-3]?[0-9]$ ]]; then 
    run_log_pull $answer $s3_bucket
    run_log_join $answer;
else
    echo "Enter Date in format YYYY-mm-dd, please.";
fi

echo "============================ AWS Log Sync Complete ========================================="