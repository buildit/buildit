/**
 * Created by jonlazarini on 21/03/17.
 */
var $ = require('jquery')
var visibility = require('../components/visibility.js');
var transition = require('../components/transition.js');


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
