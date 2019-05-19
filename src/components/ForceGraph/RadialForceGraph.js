import React, { useEffect, useRef } from "react"
import { compose, path } from "ramda"
import { extent, select } from "d3"
import { defaultProps, withProps } from "recompose"
import { getDragHandler, getRadialForceSimulation, getRadialSpaceGraphScales } from "./helpers"
import BEM from "../../helpers/BEM"
import "./RadialForceGraph.scss"
import {
  withCalculatedChartSize,
  withCleanedFromIntermediateStopsData,
  withIndexedStopsData,
  withStopsData
} from "../HOC"

const b = BEM("RadialForceGraph")

const RadialForceGraph = ({ chartHeight, chartWidth, drawChart }) => {
  const rootEl = useRef(null)
  useEffect(() => drawChart(rootEl.current), [])
  return <svg ref={rootEl} height={chartHeight} width={chartWidth} />
}

const enhancer = compose(
  defaultProps({
    width: 600,
    height: 600,
    margin: { top: 0, left: 0, bottom: 0, right: 0 },
    showLabels: false,
    getVisualizationScales: getRadialSpaceGraphScales
  }),
  // chart size definition
  withCalculatedChartSize,
  // data processing
  withStopsData,
  withIndexedStopsData,
  withCleanedFromIntermediateStopsData,
  withProps(({ chartWidth, chartHeight, data, getVisualizationScales }) => ({
    drawChart: rootEl => {
      const connectionsDomain = extent(data.nodes, path(["connections", "length"]))
      const { nodeRadiusScale, colorScale, positionScale, nodeSpaceRadiusScale } = getVisualizationScales(
        connectionsDomain
      )
      const simulation = getRadialForceSimulation(chartWidth, chartHeight, nodeSpaceRadiusScale, positionScale)
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
        .attr("id", JSON.stringify)

      const nodes = svg
        .append("g")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("g")
        .attr("class", b("node"))
        .on("click", d => console.log(d))
        .call(dragHandler)

      nodes
        .append("circle")
        .attr("r", d => nodeRadiusScale(d.connections.length))
        .attr("fill", d => colorScale(d.connections.length))

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

export default enhancer(RadialForceGraph)
