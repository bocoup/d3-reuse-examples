d3.chart("BarChart").extend("FadingBarChart", {
  initialize: function(options) {

    var chart = this;

    var fadeOut = function() {
      var length = 0;
      // Terrible hack to get the length of the selection
      this.each(function() { length++; });
      this.attr("opacity", function(d, i) {
        return i / length;
      });
    };

    this.layer("bars").on("enter", fadeOut);
    this.layer("bars").on("update:transition", fadeOut);
  }
});
