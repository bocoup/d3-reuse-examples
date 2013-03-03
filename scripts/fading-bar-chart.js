window.FadingBarChart = function(options) {

  "use strict";
  var BarChart = window.BarChart;

  var fadingBarChart = BarChart(options);
  var fadeOut = function() {
    var length = 0;
    // Terrible hack to get the length of the selection
    this.each(function() { length++; });
    this.attr("opacity", function(d, i) {
      return i / length;
    });
  };

  fadingBarChart.on("enter", fadeOut);
  fadingBarChart.on("update:transition", fadeOut);

  return fadingBarChart;
};
