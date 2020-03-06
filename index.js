// ----- Initializations -----

//For Isotope integration to filter cards with sliders
var grid;

var dimensions = {
  "economics": {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    range: {
      0: "COMMON GOOD",
      10: "PRIVATE GOOD"
    }
  },
  "size": {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    range: {
      0: "SMALL",
      10: "LARGE"
    }
  },
  "porosity": {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    range: {
      0: "OPEN",
      10: "CLOSED"
    }
  },
  "platform": {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    range: {
      0: "PHYSICAL",
      10: "DIGITAL"
    }
  },
  "governance": {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    range: {
      0: "DECENTRALIZED",
      10: "CENTRALIZED"
    }
  }
};

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
      .prepend(key);
    slider.find("#left").text(value.range[0]);
    slider.find("#right").text(value.range[10]);
    slider
      .find("input[type=range]")
      .attr("id", key.toLowerCase().replace("/", "_") + "-slider");
    slider.removeClass("template").appendTo(template.parent());
  });
  $('[data-toggle="popover"]').popover();
};

// As soon as the webpage is loaded
$(document).ready(function() {
  // Initialize the Slider
  initSlider();

  // Read data from the file and populate
  var addCards = $.getJSON("data/test.json", function(data) {
    window.data = data;
    var template = $(".card-list .flex-card.template");
    $.each(data, function(key, item) {
      var card = template.clone();
      card.attr("data-id", key);
      card
        .find(".flex-card-front")
        .css("background-image", `url(./data/image/${item.backgroundImage})`); // `"background-image:url(data/image/"${item.backgroundImage})`);
      card
        .find(".item-image")
        .attr({ src: "data/image/" + item.itemImage, alt: item.title });
      card.find(".item-title").text(item.title);
      // Only shows first 50 words
      card.find(".item-description").text(
        item.description
          .split(" ")
          .slice(0, 50)
          .join(" ")
      );
      // Only shows first 250 words
      card.find(".item-longDescription").text(item.longDescription
        .split(" ")
        .slice(0, 250)
        .join(" "));
      card.find(".button-expand").append(item.title);
      $.each(item.values, function(k, val) {
        var span = $("<span/>")
          .addClass(k)
          .text(val);
        card.find(".item-data").append(span);
      });
      $(".item-data").hide();
      card.removeClass("template");
      $(".card-list").append(card);
    });
  });
  // When populated, initialize Isotope grid
  addCards.done(() => {
    initGrid();
  });
});

function create_filter(filter, number) {
  return parseInt(number, 10) < filter + 2 && parseInt(number, 10) > filter - 2;
}

/* Create generic template filter */

$(".sideBar").on("change", "input[type=range]", function() {
  let porosity_filter = parseInt($("#porosity-slider").val());
  let economics_filter = parseInt($("#economics-slider").val());
  let size_filter = parseInt($("#size-slider").val());
  let platform_filter = parseInt($("#platform-slider").val());
  let governance_filter = parseInt($("#governance-slider").val());

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
        create_filter(porosity_filter, porosity_num) ||
        create_filter(economics_filter, economics_num) ||
        create_filter(size_filter, size_num) ||
        create_filter(platform_filter, platform_num) ||
        create_filter(governance_filter, governance_num)
      );
    }
  });
});

// ----- Prevent cluttering of popovers -----
$(document).click(function(e) {
  var clickedOn = $(e.target);
  $(".iconLabel .btn[aria-describedby]").each(function(key, elem) {
    let popover = $(elem).attr("aria-describedby");
    if (
      !(
        clickedOn.closest(".popover").length &&
        clickedOn.closest(".popover").attr("id") === popover
      ) &&
      clickedOn.closest(".iconLabel .btn[aria-describedby]")[0] !== elem
    ) {
      $(elem).popover("hide");
    }
  });
});

// On button click, expands modal to show title and description
$(".card-list").on("click", ".button-expand", function() {
  var modal = $("#myModal");
  var item =
    window.data[
      $(this)
        .parents(".flex-card")
        .attr("data-id")
    ];
  modal.find(".item-title").text(item.title);
  modal.find(".item-longDescription").text(item.longDescription);
  modal.find(".item-image").text(item.itemImage);
  modal.modal("show");
});

$(".nav-bar").on("click")