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
    type: 'image'
  });

  $('.image').visibility('refresh');

  /**
   * Beginning side links animation
   * */
      var $links;
      var handler
        ;
      $links = $('.item.nav-link')

      handler = {
        activate: function() {
          // console.log('this in handler', this)
          $(this)
            .addClass('active')
            .siblings()
            .removeClass('active')
        }
      }
      // init
      $links.on('click', handler.activate)
  /** end side links animation **/
})
