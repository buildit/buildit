/**
 * Created by jonlazarini on 21/03/17.
 */
$(document).ready(function () {

  $('.navigation')
    .visibility({
      once: false,
      onBottomPassed: function () {
        $('.secondary-navigation').transition('fade in');
      },
      onBottomPassedReverse: function () {
        $('.secondary-navigation').transition('fade out');
      }
    });

  $('.ui.sidebar').sidebar('attach events', '.toc.item');

  // lazy load images
  $('.image').visibility({
    type: 'image'
  });

  $('.image').visibility('refresh');

  // Template for jobs data on careers page
  function tpl(jobData) {
    var template = '<li class="opening-job job column eight wide">';
    template += '<a href="https://jobs.smartrecruiters.com/ni/WiproDigital/' + jobData.uuid + '" class="link--block details">';
    template += '<h3 class="details-title job-title link--block-target">' + jobData.name + '</h3>';
    template += '<ul class="details-desc desc-items list--dotted">';
    template += '<li class="desc-item">' + jobData.location.city + ', ' + jobData.customField[1].valueLabel + '</li>';
    template += '<li class="desc-item">' + jobData.typeOfEmployment.label + '</li>';
    template += '</ul>'
    template += '</a>';
    template += '</li>';
    return template;
  }

  function processJobData(data) {

    // compare Fn
    function sortCity(jobA, jobB) {
      if (jobA.location.city > jobB.location.city) {
        return 1;
      }
      if (jobA.location.city < jobB.location.city) {
        return -1;
      }
      return 0;
    }

    // group by country
    var jobs = data.reduce(function (accumulator, currentItem) {
      if (currentItem.location.country === 'gb') {
        currentItem.location.country = 'uk';
      }
      if (!accumulator[currentItem.location.country]) {
        accumulator[currentItem.location.country] = [];
      }
      accumulator[currentItem.location.country].push(currentItem);
      return accumulator;
    }, {});

    // sort by city
    Object.keys(jobs).map(function (currentItem) {
      jobs[currentItem].sort(sortCity);
    });

    // combine country arrays
    var conbinedJobs = Object.keys(jobs).sort().reduce(function (accumulator, currentItem) {
      return accumulator.concat(jobs[currentItem]);
    }, []);

    return conbinedJobs;
  }

  if ($('ul#jobs-board').length) {

    var url = "https://api.smartrecruiters.com/v1/companies/WiproDigital/postings?";
    // get jobs that are Buildit not WD
    var getBrand = 'custom_field.5880c55be4b0cfde272956ad=83455af9-c888-4221-9312-4750b5a09bf5';

    fetch(url + getBrand).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
      .then(function (response) {
        var wrapper = $('ul.opening-jobs');
        var combinedData = processJobData(response.content);

        wrapper.append(
          combinedData
            .map(tpl)
            .join('')
        );

      })
      .catch(function (error) {
        console.log(error);
      });
  }

});
