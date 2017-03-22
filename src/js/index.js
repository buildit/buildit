/**
 * Created by jonlazarini on 21/03/17.
 */
$(document).ready(function() {

  $('.masthead')
    .visibility({
      once: false,
      onBottomPassed: function() {
        $('.fixed.menu').transition('fade in');
      },
      onBottomPassedReverse: function() {
        $('.fixed.menu').transition('fade out');
      }
    });

  // nav on careers, make
  $('.nomasta')
    .visibility({
      once: false,
      onBottomPassed: function() {
        $('.fixed.menu').transition('fade in');
      },
      onBottomPassedReverse: function() {
        $('.fixed.menu').transition('fade out');
      }
    })
  ;

  // lazy load images
  $('.image').visibility({
    type: 'image',
    transition: 'horizontal zoom pulse',
    duration: 4000
  });

  $('.image').visibility('refresh');

})
