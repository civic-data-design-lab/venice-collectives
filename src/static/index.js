// ----- Initializations -----

//For Isotope integration to filter cards with sliders
var grid;

var dimensions = {
  "economics": {
    description:
      "Economics refers to the entities who profit from the collective, the intent to profit or not, the degree to which the collective directly benefits from its members versus profiting from a private investor/ owner of a platform.",
    range: {
      0: "COMMON GOOD",
      10: "PRIVATE GOOD"
    }
  },
  "size": {
    description:
      "Size refers to the number of members in a collective; it is a way to evaluate quantity.",
      range: {
      0: "SMALL",
      10: "LARGE"
    }
  },
  "porosity": {
    description:
      "Porosity refers to the ability of members to join and leave the collective n terms of process, time cycle, qualifications, etc. The two main factors include the (a) ease in which to join and leave and (b) the collective’s anticipation to changes in membership.",
    range: {
      0: "OPEN",
      10: "CLOSED"
    }
  },
  "platform": {
    description:
      "Platform defines whether a collective exists on an exclusively digital or physical platform or somewhere in between.",
    range: {
      0: "PHYSICAL",
      10: "DIGITAL"
    }
  },
  "governance": {
    description:
      "Governance assesses how a collective is managed.",
    range: {
      0: "DECENTRALIZED",
      10: "CENTRALIZED"
    }
  }
};

var FormText = {
  "FormEcon": {
    1:"Common goods<br><br>",
    2:"Mostly common goods<br><br>",
    3:"Mix of common and private goods<br><br>",
    4:"Mostly private goods<br><br>",
    5:"Private<br>goods"
  },
  "FormSize": {
    1:"<50<br><br>",
    2:"50 to 100<br><br>",
    3:"100 to 1,000<br><br>",
    4:"1,000 to 5,000<br><br>",
    5:">5,000<br><br>"
  },
  "FormPorous": {
    1:"Open to anyone<br><br>",
    2:"Mostly open<br><br>",
    3:"Invitation required<br><br>",
    4:"Mostly closed<br><br>",
    5:"Closed<br><br>"
  },
  "FormPlatform": {
    1:"Physical only<br><br>",
    2:"Mostly physical<br><br>",
    3:"Mix of physical and digital<br><br>",
    4:"Mostly digital<br><br>",
    5:"Digital<br><br>"
  },
  "FormGovern": {
    1:"Decentralized<br><br>",
    2:"Mostly decentralized<br><br>",
    3:"Mixed or federated<br><br>",
    4:"Mostly centralized<br><br>",
    5:"Centralized<br><br>"
  }
}


// Initialize Isotope on the card-grid
var initGrid = function() {
  // init isotope
  grid = new Isotope("#card-grid", {
    // options
    itemSelector: ".flex-card",
    layoutMode: "fitRows",
    order: "random",
    getSortData: {
      porosity: ".porosity parseInt",
      economics: ".economics parseInt",
      size: ".size parseInt",
      platform: ".platform parseInt",
      governance: ".governance parseInt"
    }
  });
};

// Create the sliders from dimensions
var initSlider = function() {
  var template = $(".slider.template");
  $.each(dimensions, function(key, value) {
    var slider = template.clone();
    slider
      .find(".btn")
      .attr("data-content", value.description)
    slider.find(".iconLabel .title").prepend(key);
    slider.find(".iconLabel input").attr('id',`${key}_chk`);
    slider.find(".iconLabel label").attr('for',`${key}_chk`);
    slider.find("#left").text(value.range[0]);
    slider.find("#right").text(value.range[10]);
    slider
      .find("input[type=range]")
      .attr("id", key.toLowerCase().replace("/", "_") + "-slider");
    slider.removeClass("template").appendTo(template.parent());
  });
  $('[data-toggle="popover"]').popover();
};

// For the radar chart
RadarChart.defaultConfig.color = function() {};
RadarChart.defaultConfig.radius = 3;
RadarChart.defaultConfig.w = 200;
RadarChart.defaultConfig.h = 200;


// As soon as the webpage is loaded
$(document).ready(function() {
  // check cookies
  if (document.cookie.includes("visited=true")) {
    $('#splashScreen').hide()
  } else {
    var d = new Date();
    d.setTime(d.getTime() + (14 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "visited=true;" + expires + "path=/";
  }
  // Initialize the Slider
  initSlider();

  // Read data from the file and populate
  var addCards = $.getJSON("/?q=api", function(data,error) {
    console.log(error)
    window.data = data;
    var template = $(".card-list .flex-card.template");
    var total_values = {}
    $.each(dimensions, function(key, item){
      total_values[key]=0
    });
    $.each(data.data, function(key, item) {
      var card = template.clone();
      card.attr("data-id", key);
      card // Finding front photo of card first
        .find(".flex-card-front")
        .css("background-image", `url(./static/image/${item.image})`); // `"background-image:url(data/image/"${item.backgroundImage})`);
      
      card // Finding back photo of card upon click
        .find(".item-image")
        .css("item-image", `url(./static/image/${item.image})`);

      card.find(".item-title .title-text").text(item.title);
      // card.find(".item-link").text(item.link);
      // var link = card.find(".item-link").text( // Makes variable link for card link(if any)
      // item.link).html();

      console.log(item.link); // Expected return is link as string, sometimes works
      card.find("#title-link").attr("href", item.link).text(item.link);

      card.find(".item-description").text( //Only finds first 50 words for flex card back
        item.description
          .split(" ")
          .slice(0, 50)
          .join(" ")
      ); 
      card.find(".item-longDescription").text(// Finds all words for modal
        item.longDescription);

      //Appends all card info found 
      card.find(".button-expand").append(item.title);
      $.each(item.values, function(k, val) {
        total_values[k]+=val
        var span = $("<span/>")
          .addClass(k)
          .text(val);
        card.find(".item-data").append(span);
      });
      $(".item-data").hide();
      card.removeClass("template");
      $(".card-list").append(card);
    });
    var avg_values = {};
    $.each(dimensions, function(key, item){
      avg_values[key]=total_values[key]/data.data.length
    });
    window.data['average']=avg_values
  });
  // When populated, initialize Isotope grid
  addCards.done(() => {
    initGrid();
  });
  // filters on / off
  $('.on-off-label').on("click", function(){
    $(this).closest('.slider').toggleClass('active')
  })
  $("a.iconLabel").on("click", function() {
    $(this).closest('.slider').toggleClass('active')
  });
});

function create_filter(filter, number, filter_on) {
  if (filter_on) {
    return parseInt(number, 10) <= filter + 2 && parseInt(number, 10) >= filter - 2;
  } else {
    return parseInt(number, 10) <= filter + 10 && parseInt(number, 10) >= filter - 10;
  }
  
}

function data_for_radar_chart(values) {
  axes = []
  $.each(values, function(key,value) {
    axes.push({axis:key, value:value})
  })
  return axes;
}

/* Create generic template filter */

$(".sideBar").on("change", "input[type=range]", function() {
  let porosity_filter = parseInt($("#porosity-slider").val());
  let economics_filter = parseInt($("#economics-slider").val());
  let size_filter = parseInt($("#size-slider").val());
  let platform_filter = parseInt($("#platform-slider").val());
  let governance_filter = parseInt($("#governance-slider").val());

  let porosity_on = $("#porosity-slider").closest('.slider').hasClass('active');
  let economics_on = $("#economics-slider").closest('.slider').hasClass('active');
  let size_on = $("#size-slider").closest('.slider').hasClass('active');
  let platform_on = $("#platform-slider").closest('.slider').hasClass('active');
  let governance_on = $("#governance-slider").closest('.slider').hasClass('active');

  grid.arrange({
    filter: function() {
      var porosity_num = $(this)
        .find(".porosity")
        .text();
      var economics_num = $(this)
        .find(".economics")
        .text();
      var size_num = $(this)
        .find(".size")
        .text();
      var platform_num = $(this)
        .find(".platform")
        .text();
      var governance_num = $(this)
        .find(".governance")
        .text();

      // Only returns values 5 numbers greater or lower than chosen one (range 0-30)
      return (
        create_filter(porosity_filter, porosity_num, porosity_on) &&
        create_filter(economics_filter, economics_num, economics_on) &&
        create_filter(size_filter, size_num, size_on) &&
        create_filter(platform_filter, platform_num, platform_on) &&
        create_filter(governance_filter, governance_num, governance_on)
      );
    }
  });
});

// ----- Prevent cluttering of popovers -----
$(document).click(function(e) {
  var clickedOn = $(e.target);
  $(".btn[aria-describedby]").each(function(key, elem) {
    let popover = $(elem).attr("aria-describedby");
    console.log(popover)
    if (
      !(
        clickedOn.closest(".popover").length &&
        clickedOn.closest(".popover").attr("id") === popover
      ) &&
      clickedOn.closest(".btn[aria-describedby]")[0] !== elem
    ) {
      $(elem).popover("hide");
    }
    
  });
});
// On button click, expands modal to show title and description
$(".card-list").on("click", ".button-expand", function() {
  var modal = $("#myModal");
  var item =
    window.data.data[
      $(this)
        .parents(".flex-card")
        .attr("data-id")
    ];
  
  var data = [{
    className: 'element',
    axes: data_for_radar_chart(item.values)
  },
{
  className: 'average',
  axes: data_for_radar_chart(window.data.average)
}];
  modal.find(".item-title").text(item.title);
  modal.find(".item-link").text(item.link);
  modal.find(".item-longDescription").text(item.longDescription);
  var chart = RadarChart.chart();
  var cfg = chart.config(); // retrieve default config
  modal.find('.radar-chart').html('');
  var svg = d3.select('.radar-chart').append('svg')
    .attr('width', cfg.w + 50)
    .attr('height', cfg.h + 50);
  svg.append('g').classed('single', 1).datum(data).call(chart);
  // modal.find(".item-image").css("background-image", `url('data/image/${item.itemImage}')`);
  modal.find(".modal-image").attr("src", `static/image/${item.image}`);
  modal.modal("show");
});
// $(".nav-bar").on("click")

// ----- Resetting station sliders to normal-----
$('#station-reset').on("click", function() {
  $('.on-off').prop('checked', false);
  $("#porosity-slider, #economics-slider, #size-slider, #platform-slider, #governance-slider").closest('.slider').removeClass('active');
  $("#porosity-slider, #economics-slider, #size-slider, #platform-slider, #governance-slider").val(5);

})

// ----- HAMBURGER WORKING -----
$('.sidebar-control').click(function() {
  const icon = $(this).find('#hamburger');
  if (icon.hasClass('open')) {
    $('#main-content').removeClass('sidebar-shown');
    icon.removeClass('open');
    $('body').removeClass('hide-overflow');
  } else {
    $('#main-content').addClass('sidebar-shown');
    icon.addClass('open');
    $('body').addClass('hide-overflow');
  }
});

$('#primary > .overlay').click(function() {
  const icon = $('#hamburger');
  $('#main-content').removeClass('sidebar-shown');
  icon.removeClass('open');
  $('body').removeClass('hide-overflow');
});

const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".range-value");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = FormText[range.id][val];

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
};

$('.tablinks').click(function(){
  $('.tabcontent').removeClass('active')
  $('.tablinks').removeClass('active')
  let activeTab = $(this).attr('id').slice(0,-3)
  $(`#${activeTab}Content`).addClass('active')
  $(this).addClass('active')
});

$('#splashScreen a').click(function(){
  $('#splashScreen').fadeOut()
});