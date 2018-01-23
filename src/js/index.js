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

  // "buildit website" Custom Source TRID from SmartRecruiters
  var sourceTrackingId = '2f4a2735-7172-45dd-aca7-63618dca8aff';

  // Template for jobs data on careers page
  function tpl(jobData) {
    var template = '<li class="opening-job job column eight wide">';
    template += '<a href="https://jobs.smartrecruiters.com/ni/WiproDigital/' + jobData.uuid + '?trid=' + sourceTrackingId + '" class="link--block details">';
    template += '<h4 class="details-title job-title link--block-target">' + jobData.name + '</h4>';
    template += '<ul class="details-desc desc-items list--dotted">';
    template += '<li class="desc-item">' + jobData.location.city + ', ' + jobData.customField[1].valueLabel + '</li>';
    template += '<li class="desc-item">' + jobData.typeOfEmployment.label + '</li>';
    template += '</ul>'
    template += '</a>';
    template += '</li>';
    return template;
  }

  function divideByCountry(obj, job) {
    if (!obj[job.location.country]) {
      obj[job.location.country] = [];
    }
    obj[job.location.country].push(job);
    return obj;
  }

  function sortByCity(a, b) {
    var x = a.location.city;
    var y = b.location.city;

    if (x > y) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
    return 0;
  }

  if ($('div#jobs-board').length) {
    (function () {

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
          var data = response.content;
          var wrapper = $('div.opening-jobs');
          var title = $('<h3>')
          var countryCodes = {
            'gb': 'United Kingdom',
            'ie': 'Ireland',
            'in': 'India',
            'us': 'United States',
            'pl': 'Poland'
          };
          var listing = $('<ul class="grid--gutter padding--none opening-jobs">');

          data = data.reduce(divideByCountry, {});

          for (country in data) {
            if (data.hasOwnProperty(country) && data[country].length > 0) {
              wrapper.append(title.clone().append(countryCodes[country]));
              wrapper.append(listing.clone().append(data[country].sort(sortByCity).map(tpl).join('')));
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    })();
  }

});
