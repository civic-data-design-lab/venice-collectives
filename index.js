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

$('document').ready( function (){
  // init isotope
  var grid = new Isotope( '#card-grid', {
    // options
      itemSelector: '.flex-card',
      getSortData: {
        openness: '.openness parseInt'
      }
    });

  $('#open-closed').click(function(){
    let open_filter = $(this).val()
    console.log(open_filter)

    grid.arrange({ filter: function() {
        var number = $(this).find('.openness').text();
        console.log
        return parseInt( number, 10 ) == open_filter;
      } 
    })
  })
  
});
// element argument can be a selector string
//   for an individual element
// var iso = new Isotope( '.grid', {
//   // options
// })