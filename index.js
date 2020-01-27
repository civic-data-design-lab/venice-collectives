// var elem = document.querySelector('.grid');
// var iso = new Isotope( elem, {
//   // options
//   itemSelector: '.grid-item',
//   layoutMode: 'fitColumns'
// });

$('ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});

// element argument can be a selector string
//   for an individual element
// var iso = new Isotope( '.grid', {
//   // options
// });