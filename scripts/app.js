(function(window, undefined) {

  "use strict";

  var d3 = window.d3;
  var DataSrc = window.DataSrc;
  var BarChart = window.BarChart;
  var Chord = window.Chord;
  // From http://mkweb.bcgsc.ca/circos/guide/tables/
  var matrix = [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ];

  var dataSrc = new DataSrc();
  var myBarChart = BarChart();
  myBarChart.draw(dataSrc);
  setInterval(function() {
    dataSrc.fetch();
    myBarChart.draw(dataSrc);
  }, 1500);

  var dataSrc2 = new DataSrc();
  var myCustomBarChart = BarChart();
  var fadeOut = function() {
    this.attr("opacity", function(d, i) {
      return i / dataSrc2.data.length;
    });
  };
  myCustomBarChart.on("enter", fadeOut);
  myCustomBarChart.on("update:transition", fadeOut);
  myCustomBarChart.draw(dataSrc2);
  setInterval(function() {
    dataSrc2.fetch();
    myCustomBarChart.draw(dataSrc2);
  }, 1500);

  var myChord = Chord();
  myChord(matrix);

  var colors = ["#000000", "#FFDD89", "#957244", "#F26224"];
  var myCustomChord = Chord();
  myCustomChord.layers.ticks.on("enter", function() {
    this.each(function(data, idx, group) {
      d3.select(this)
        .style("font-weight", "bold")
        .attr("fill", colors[group]);
    });
  });
  myCustomChord(matrix);

}(this));
