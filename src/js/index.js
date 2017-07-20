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

  function divideByCountry(obj, job) {
    if (!obj[job.location.country]) {
      obj[job.location.country] = [];
    }
    obj[job.location.country].push(job);
    return obj;
  }
  // const matchCity = city => data => data.location.city === city;
  // Filter by city
  // function matchCity(city) {
  //   return function (data) {
  //     return data.location.city.toLowerCase() === city;
  //   }
  // }

  // Sort By Country
  function sortCountry(x, y) {
    if (x > y) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
    return 0;
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

  if ($('ul#jobs-board').length) {
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
          var wrapper = $('ul.opening-jobs');

          data = data.reduce(divideByCountry, {});

          var countries = Object.keys(data);
          formattedData = countries
            .map(function(country, index) {
              data[country].sort(sortByCity);
              if (country === 'gb') {
                return 'uk';
              }
              return country;
            })
            .sort(sortCountry)
            .map(function(country, index) {
              if (country === 'uk') {
                return data['gb'];
              }
              return data[country];
            });
          formattedData = [].concat.apply([], formattedData);
          wrapper.append(
            formattedData
              .map(tpl)
              .join('')
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    })();
  }

});
