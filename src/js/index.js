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

  function tpl(jobData) {
    var template = '<li class="opening-job job column wide-1of2 medium-1of2">';
    template += '<a href="https://jobs.smartrecruiters.com/" class="link--block details">';
    template += '<h3 class="details-title job-title link--block-target">' + jobData.name + '</h3>';
    template += '<ul class="details-desc desc-items list--dotted">';
    template += '<li class="desc-item">' + jobData.location.city + ', ' + jobData.region + '</li>';
    template += '<li class="desc-item">' + jobData.typeOfEmployment.label + '</li>';
    template += '</ul>'
    template += '</a>';
    template += '</li>';
    return template;
  }

  function matchCity(city) {
    return function (data) {
      return data.location.city.toLowerCase() === city;
    }
  }

  // const matchCity = city => data => data.location.city === city;

  if ($('ul.opening-jobs.grid--gutter')) {

    (function () {

      var url = "https://api.smartrecruiters.com/v1/companies/WiproDigital/postings?";
      var limitRequest = 'offset=10&limit=10';
      var customField = 'custom_field.5880c55be4b0cfde272956ad=83455af9-c888-4221-9312-4750b5a09bf5';

      fetch(url + customField).then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
        .then(function (response) {
          // console.log(response.content);
          // console.log(response.content.length);
          var data = response.content;
          var wrapper = $('ul.opening-jobs');

          // .filter(matchCity('toronto'))
          wrapper.append(
            data
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
