d3.chart("BarChart", {

  initialize: function(options) {

  options = options || {};

  var chart = this;

  this.x = d3.scale.linear();

  this.y = d3.scale.linear()
    .domain([0, 100]);

  this.base
    .attr("class", "chart");

  function onEnter() {
    var length = this.chart().length;

    this.attr("x", function(d, i) { return chart.x(i + 1) - .5; })
        .attr("y", function(d) { return chart.h - chart.y(d.value) - .5; })
        .attr("width", chart.w / length)
        .attr("height", function(d) { return chart.y(d.value); });
  }

  function onEnterTrans() {
    this.duration(1000)
        .attr("x", function(d, i) { return chart.x(i) - .5; });
  }

  function onTrans() {
    this.duration(1000)
        .attr("x", function(d, i) { return chart.x(i) - .5; });
  }

  function onExitTrans() {
    this.duration(1000)
        .attr("x", function(d, i) { return chart.x(i - 1) - .5; })
        .remove();
  }

  function dataBind(data) {
    return this.selectAll("rect")
      .data(data, function(d) { return d.time; });
  }

  function insert() {
    return this.insert("rect", "line");
  }

  var bars = this.layer("bars", this.base.append("g"), {
    dataBind: dataBind,
    insert: insert
  });

  bars.on("enter", onEnter);
  bars.on("enter:transition", onEnterTrans);
  bars.on("update:transition", onTrans);
  bars.on("exit:transition", onExitTrans);
  this.width(options.width || 600);
  this.height(options.height || 80);

  },

  width: function(newWidth) {
    if (!arguments.length) {
      return this.w;
    }
    this.w = newWidth;
    this.x.range([0, this.w]);
    this.base.attr("width", this.w);
    return this;
  },

  height: function(newHeight) {
    if (!arguments.length) {
      return this.h;
    }
    this.h = newHeight;
    this.y.rangeRound([0, this.h]);
    this.base.attr("height", this.h);
    return this;
  },

  // Convert the provided dataSrc object into a data array, and update relevant
  // chart attributes so it can updated to changing input sizes.
  transform: function(dataSrc) {
    this.length = dataSrc.data.length;
    this.x.domain([0, this.length]);
    return dataSrc.data;
  }

});
