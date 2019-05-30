// @flow
import React, { useEffect, useRef } from "react"
import { withParentSize } from "@vx/responsive"
import { extent, select, scaleLinear, svg, max, json, axisBottom, axisLeft } from "d3"
import { line } from "d3-shape"
import { compose, defaultProps, withProps } from "recompose"

import "./DistributionViz.scss"
import BEM from "../../helpers/BEM"
const b = BEM("DistributionViz")

const DistributionViz = ({ height, width, drawChart }) => {
  const rootEl = useRef(null)
  useEffect(() => drawChart(rootEl.current))
  return <svg ref={rootEl} className={b()} height={height} width={width} />
}

export default compose(
  defaultProps({
    width: 500,
    height: 250,
    margin: { top: 150, left: 100, bottom: 30, right: 50 }
  }),

  // visualization preparation
  withProps(({ width, height, margin }) => ({
    drawChart: rootEl => {
      const graph = select(rootEl)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      let x = scaleLinear().range([0, width])
      let y = scaleLinear().range([height, 0])

      // Define the axes
      let xAxis = axisBottom().scale(x)

      let yAxis = axisLeft()
        .scale(y)
        .ticks(5)
        .tickSize(-width)

      // Define the line
      let valueline = line()
        .x(d => {
          return x(d.paths)
        })
        .y(d => {
          return y(d.quantity)
        })

      json("/data/examplePathDistributionData.json").then(data => {
        x.domain(
          extent(data, d => {
            return d.paths
          })
        )
        y.domain([
          0,
          max(data, d => {
            return d.quantity
          })
        ])

        graph
          .append("path")
          .attr("class", b("bristol_c_space"))
          .attr("d", valueline(data))

        graph
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("r", 3)
          .attr("cx", d => {
            return x(d.paths)
          })
          .attr("cy", d => {
            return y(d.quantity)
          })
          .attr("fill", "#1B1733")

        graph
          .append("g")
          .attr("class", b("axis"))
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)

        graph
          .append("g")
          .attr("class", b("axis"))
          .call(yAxis)
      })
    }
  }))
)(DistributionViz)
