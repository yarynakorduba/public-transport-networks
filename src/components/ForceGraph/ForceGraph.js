// @flow
import React, { useEffect, useRef } from "react"
import { prop, path } from "ramda"
import { extent, select } from "d3"
import { compose, defaultProps, withProps } from "recompose"
import { getForceSimulation, getDefaultSpaceGraphScales, getDragHandler } from "./helpers"
import BEM from "../../helpers/BEM"
import {
  withCalculatedChartSize,
  withCleanedFromIntermediateStopsData,
  withIndexedStopsData,
  withStopsData
} from "../HOC"
import "./ForceGraph.scss"

const b = BEM("ForceGraph")

const ForceGraph = ({ chartHeight, chartWidth, drawChart }) => {
  const rootEl = useRef(null)
  useEffect(() => drawChart(rootEl.current), [])
  return <svg ref={rootEl} className={b()} height={chartHeight} width={chartWidth} />
}

const enhancer = compose(
  defaultProps({
    width: 600,
    height: 600,
    margin: { top: 0, left: 0, bottom: 0, right: 0 },
    showLabels: false,
    getVisualizationScales: getDefaultSpaceGraphScales
  }),
  // chart size definition
  withCalculatedChartSize,
  // data processing
  withStopsData,
  withIndexedStopsData,
  withCleanedFromIntermediateStopsData,
  withProps(({ chartWidth, chartHeight, data, showLabels, getVisualizationScales }) => ({
    drawChart: rootEl => {
      const connectionsDomain = extent(data.nodes, path(["connections", "length"]))
      const { nodeRadiusScale, nodeSpaceRadiusScale, colorScale, fontSizeScale } = getVisualizationScales(
        connectionsDomain
      )
      const simulation = getForceSimulation(chartWidth, chartHeight, nodeSpaceRadiusScale)
      const dragHandler = getDragHandler(simulation)

      const svg = select(rootEl)
      svg.selectAll("*").remove()
      const links = svg
        .append("g")
        .attr("class", b("links"))
        .selectAll(b("line"))
        .data(data.links)
        .enter()
        .append("line")
        .attr("class", b("line"))

      const nodes = svg
        .append("g")
        .selectAll(b("node"))
        .data(data.nodes)
        .enter()
        .append("g")
        .attr("class", b("node"))
        .on("click", d => console.log(d))
        .call(dragHandler)

      nodes
        .append("circle")
        .attr("fill", d => colorScale(d.connections.length))
        .attr("r", ({ r }) => nodeRadiusScale(r))

      if (showLabels) {
        nodes
          .append("g")
          .attr("class", b("labels"))
          .append("text")
          .attr("class", b("text-label"))
          .text(prop("label"))
          .attr("font-size", ({ r }) => fontSizeScale(r) + "rem")
      }

      simulation
        .nodes(data.nodes)
        .on("tick", () => {
          links
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)

          nodes.attr("transform", ({ x, y }) => `translate(${x}, ${y})`)
        })
        .force("link")
        .links(data.links)
    }
  }))
)

export default enhancer(ForceGraph)
