import React, { useEffect, useRef } from "react"
import { withParentSize } from "@vx/responsive"
import { prop, path } from "ramda"
import { extent, select } from "d3"
import { branch, compose, defaultProps, renameProps, renderComponent, withProps } from "recompose"
import { getForceSimulation, spaceGraphScales, prepareDataForLSpaceVisualization, getDragHandler } from "./helpers"
import { connect } from "react-redux"
import { fetchStops } from "../../actions"
import { areDataFetching, getData } from "../../reducers"

import "./SpaceGraph.scss"
import BEM from "../../helpers/BEM"
const b = BEM("SpaceGraph")

const SpaceGraph = ({ chartHeight, chartWidth, drawChart }) => {
  const rootEl = useRef(null)
  useEffect(() => drawChart(rootEl.current))
  return <svg ref={rootEl} className={b()} height={chartHeight} width={chartWidth} />
}

const withDrawingChart = withProps(({ chartWidth, chartHeight, data, showLabels }) => ({
  drawChart: rootEl => {
    const graphData = prepareDataForLSpaceVisualization(data)
    const connectionsDomain = extent(graphData.nodes, path(["connections", "length"]))
    const { nodeRadiusScale, nodeSpaceRadiusScale, colorScale } = spaceGraphScales(connectionsDomain)
    const simulation = getForceSimulation(chartWidth, chartHeight, nodeSpaceRadiusScale)
    const dragHandler = getDragHandler(simulation)

    const svg = select(rootEl)
    svg.selectAll("*").remove()

    const links = svg
      .append("g")
      .attr("class", b("links"))
      .selectAll(b("line"))
      .data(graphData.links)
      .enter()
      .append("line")
      .attr("class", b("line"))

    const nodes = svg
      .append("g")
      .selectAll(b("node"))
      .data(graphData.nodes)
      .enter()
      .append("g")
      .attr("class", b("node"))
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
    }

    simulation
      .nodes(graphData.nodes)
      .on("tick", () => {
        links
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y)

        nodes.attr("transform", ({ x, y }) => `translate(${x}, ${y})`)
      })
      .force("link")
      .links(graphData.links)
  }
}))

export const SpaceGraphWithDrawing = withDrawingChart(SpaceGraph)

export default compose(
  defaultProps({
    width: 600,
    height: 600,
    margin: { top: 0, left: 0, bottom: 0, right: 0 },
    showLabels: false
  }),

  // chart size definition
  withParentSize,
  renameProps({ parentHeight: "height", parentWidth: "width" }),
  withProps(({ width, height, margin }) => ({
    chartWidth: width - (margin.left + margin.right),
    chartHeight: height - (margin.top + margin.bottom)
  })),

  // data processing
  connect(
    state => ({ data: getData(state), areDataFetching: areDataFetching(state) }),
    { fetchNodes: fetchStops }
  ),
  branch(({ areDataFetching }) => areDataFetching, renderComponent(() => "Preparing the visualization...")),
  withProps(({ data, setData, fetchNodes, representationOf, space }) => !data && fetchNodes(representationOf, space)),
  branch(({ data }) => !data, renderComponent(() => "Something went wrong. We didn`t manage to load the data...")),
  // visualization preparation
  withDrawingChart
)(SpaceGraph)
