// Dropdown for each slider definition
$('ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});


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

  /* Open-closed filter */
  $('#open-closed').click(function(){
    let open_filter = parseInt($(this).val())
    
    grid.arrange({ filter: function() {
        var number = $(this).find('.openness').text();
        // Only returns values 5 numbers greater or lower than chosen one (range 0-30)
        return (parseInt( number, 10 ) < open_filter + 5) && (parseInt( number, 10 ) > open_filter - 5) ; 
      } 
    })
  })

  /* Minimal-holistic filter */
  $('#minimal-holistic').click(function(){
    let complete_filter = parseInt($(this).val())
    
    grid.arrange({ filter: function() {
        var number = $(this).find('.completeness').text();
        // Only returns values 5 numbers greater or lower than chosen one (range 0-30)
        return (parseInt( number, 10 ) < complete_filter + 10) && (parseInt( number, 10 ) > complete_filter - 10) ; 
      } 
    })
  })

    /* Sited-global filter */
    $('#sited-global').click(function(){
      let size_filter = parseInt($(this).val())
      
      grid.arrange({ filter: function() {
          var number = $(this).find('.size').text();
          // Only returns values 5 numbers greater or lower than chosen one (range 0-30)
          return (parseInt( number, 10 ) < size_filter + 10) && (parseInt( number, 10 ) > size_filter - 10) ; 
        } 
      })
    })

      /* Offline-online filter */
    $('#offline-online').click(function(){
    let analogDigital_filter = parseInt($(this).val())
    
    grid.arrange({ filter: function() {
        var number = $(this).find('.analogDigital').text();
        // Only returns values 5 numbers greater or lower than chosen one (range 0-30)
        return (parseInt( number, 10 ) < analogDigital_filter + 5) && (parseInt( number, 10 ) > analogDigital_filter - 5) ; 
      } 
    })
  })

       /* Decentralized-singleLeader filter */
       $('#decentralized-singleLeader').click(function(){
        let centralization_filter = parseInt($(this).val())
        
        grid.arrange({ filter: function() {
            var number = $(this).find('.centralization').text();
            // Only returns values 5 numbers greater or lower than chosen one (range 0-30)
            return (parseInt( number, 10 ) < centralization_filter + 5) && (parseInt( number, 10 ) > centralization_filter - 5) ; 
          } 
        })
      })

});

