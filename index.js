// ----- Initializations -----

//For Isotope integration to filter cards with sliders
var grid;

var dimensions = {
  Openness: {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    range: {
      0: "Closed",
      10: "Open"
    }
  },
  Completeness: {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    range: {
      0: "Minimal",
      10: "Holistic"
    }
  },
  Size: {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    range: {
      0: "Sited",
      10: "Global"
    }
  },
  "Analog/Digital": {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    range: {
      0: "Offline-only",
      10: "Online-Only"
    }
  },
  Centralization: {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    range: {
      0: "Decentralized",
      10: "Single-leader"
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
      openness: ".openness parseInt",
      completeness: ".completeness parseInt",
      size: ".size parseInt",
      analogDigital: ".analogDigital parseInt",
      centralization: ".centralization parseInt"
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

  // Read data from the file and polulate
  var addCards = $.getJSON("data/test.json", function(data) {
    window.data = data;
    var template = $(".card-list .flex-card.template");
    $.each(data, function(key, item) {
      var card = template.clone();
      card.attr("data-id", key);
      card
        .find(".background-image, .item-image")
        .attr({ src: "data/image/" + item.image, alt: item.title });
      card.find(".item-title").text(item.title);
      card.find(".item-description").text(
        item.description
          .split(" ")
          .slice(0, 40)
          .join(" ")
      );
      card.find(".item-longDescription").text(item.longDescription);
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
  return parseInt(number, 10) < filter + 5 && parseInt(number, 10) > filter - 5;
}

/* Create generic template filter */

$(".sideBar").on("change", "input[type=range]", function() {
  let open_filter = parseInt($("#openness-slider").val());
  let complete_filter = parseInt($("#completeness-slider").val());
  let sited_filter = parseInt($("#size-slider").val());
  let offline_filter = parseInt($("#analog_digital-slider").val());
  let decent_filter = parseInt($("#centralization-slider").val());

  grid.arrange({
    filter: function() {
      var open_num = $(this)
        .find(".openness")
        .text();
      var complete_num = $(this)
        .find(".completeness")
        .text();
      var sited_num = $(this)
        .find(".size")
        .text();
      var offline_num = $(this)
        .find(".analogDigital")
        .text();
      var decent_num = $(this)
        .find(".centralization")
        .text();

      // Only returns values 5 numbers greater or lower than chosen one (range 0-30)
      return (
        create_filter(open_filter, open_num) ||
        create_filter(complete_filter, complete_num) ||
        create_filter(sited_filter, sited_num) ||
        create_filter(offline_filter, offline_num) ||
        create_filter(decent_filter, decent_num)
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
  modal.modal("show");
});

//Once button is clicked, change the card to expanded that you can x out of!
function expand(e) {
  var back = $(e.target).parents(".flex-card-back");
  back.find(".flex-card-collapse").hide();
  back.find(".flex-card-expand").show();
}

function collapse(e) {
  var back = $(e.target).parents(".flex-card-back");
  back.find(".flex-card-collapse").show();
  back.find(".flex-card-expand").hide();
}
