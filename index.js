$(function () {
  $('[data-toggle="popover"]').popover()
})

//Isotope integration to filter cards with sliders
var grid

var initGrid =  function() {
  // init isotope
  grid = new Isotope( '#card-grid', {
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
  })  
}

function create_filter(filter, number) {
  return (parseInt( number, 10 ) < filter + 5) && (parseInt( number, 10 ) > filter - 5)
}

  /* Create generic template filter */

  $('input').change(function(){
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

$(document).ready(function(){
  var addCards = $.getJSON('data/test.json',function(data){
    console.log(data)
    var template = $('.card-list .flex-card.template')
    $.each(data,function(key,item) {
      var card = template.clone()
      card.find('.item-image').attr({'src':'data/image/'+item.image, 'alt':item.title})
      card.find('.item-title').text(item.title)
      card.find('.item-description').text(item.description)
      $.each(item.values,function(k,val) {
        console.log(k)
        var span = $('<span/>').addClass(k).text(val)
        card.find('.item-data').append(span)
      })
      card.removeClass('template')
      $('.card-list').append(card)
    })
  })
  addCards.done(()=>{initGrid()})
})