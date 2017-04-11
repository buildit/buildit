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

  /**
   * Beginning side links animation
   * */
  var $links;
  var handler;
  $links = $('.item.nav-link');

  handler = {
    activate: function () {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')
    }
  }

  $links.on('click', handler.activate)
  /** end side links animation **/
});
