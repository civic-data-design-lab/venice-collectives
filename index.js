// Dropdown for each slider definition
// $('ul.nav li.dropdown').click(function() {
// //   $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
// // }, function() {
// //   $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
//   $("#dropdown").dropdown("toggle");
// });

$(function () {
  $('[data-toggle="popover"]').popover()
})

//Isotope integration to filter cards with sliders
$('document').ready( function (){
  // init isotope
  var grid = new Isotope( '#card-grid', {
    // options
      itemSelector: '.flex-card',
      layoutMode: 'fitRows',
      order: 'random',
      getSortData: {
        openness: '.openness parseInt',  
        completeness: '.completeness parseInt',
        size: '.size parseInt',
        analogDigital: '.analogDigital parseInt',
        centralization: '.centralization parseInt',
      }
    });

  /* Create generic template filter */
  function create_filter(filter, number) {
    return (parseInt( number, 10 ) < filter + 5) && (parseInt( number, 10 ) > filter - 5)
  }

  $('input').click(function(){
    let open_filter = parseInt($('#open-closed').val())
    let complete_filter = parseInt($('#minimal-holistic').val())
    let sited_filter = parseInt($('#sited-global').val())
    let offline_filter = parseInt($('#offline-online').val())
    let decent_filter = parseInt($('#decentralized-singleLeader').val())
    
    grid.arrange({ filter: function() {
      var open_num = $(this).find('.openness').text();
      var complete_num = $(this).find('.completeness').text();
      var sited_num = $(this).find('.size').text();
      var offline_num = $(this).find('.analogDigital').text();
      var decent_num = $(this).find('.centralization').text();

        // Only returns values 5 numbers greater or lower than chosen one (range 0-30)
      console.log((create_filter(open_filter, open_num) && create_filter(complete_filter, complete_num) && create_filter(sited_filter, sited_num) && create_filter(offline_filter, offline_num) && create_filter(decent_filter, decent_num) ))
      return (create_filter(open_filter, open_num) || create_filter(complete_filter, complete_num) || create_filter(sited_filter, sited_num) || create_filter(offline_filter, offline_num) || create_filter(decent_filter, decent_num) ); 
      } 
    })
  })

});

