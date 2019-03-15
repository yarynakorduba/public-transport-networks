import React, { useEffect, useRef } from "react"
import { withParentSize } from "@vx/responsive"
import { extent, select, scaleLinear, svg, max, json, axisBottom, axisLeft } from "d3"
import { line } from 'd3-shape'
import { compose, defaultProps, withProps } from "recompose"

import "./DistributionViz.scss"
import BEM from "../../helpers/BEM"
const b = BEM("DistributionViz")

const DistributionViz = ({ chartHeight, chartWidth, drawChart }) => {
  const rootEl = useRef(null)
  useEffect(() => drawChart(rootEl.current))
  return <svg ref={rootEl} className={b()} height={chartHeight} width={chartWidth} />
}

export default compose(
  defaultProps({
    width: 600,
    height: 600,
    margin: { top: 0, left: 0, bottom: 0, right: 0 },
  }),

  // visualization preparation
  withProps(({ width, height, margin }) => ({
    drawChart: rootEl => {

      const graph = select(rootEl)
      graph.selectAll("*").remove()
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      let x = scaleLinear().range([0, width]);
      let y = scaleLinear().range([height, 0]);

      // Define the axes
      let xAxis = axisBottom().scale(x)

      let yAxis = axisLeft().scale(y).ticks(5)
        .tickSize(-width);

      // Define the line
      let valueline = line()
        .x(function(d) { return x(d.paths); })
        .y(function(d) { return y(d.quantity); });

      json("../../../public/data/testik.json", function(error, data) {
        console.log("asdghjfhg")
        x.domain(extent(data, function(d) { return d.paths; }));
        y.domain([0, max(data, function(d) { return d.quantity; })]);

        graph.append("path")
          .attr("class", "line")
          .attr("class", "DistributionViz__bristol_c_space")
          .attr("d", valueline(data));

        graph.selectAll("dot")
          .data(data)
          .enter().append("circle")
          .attr("r", 3)
          .attr("cx", function(d) { return x(d.paths); })
          .attr("cy", function(d) { return y(d.quantity); })
          .attr("fill", "#1B1733")

        graph.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        graph.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      });
    }
  }))
)(DistributionViz)
