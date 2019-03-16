import React, { useEffect, useRef } from "react"
import { compose, path } from "ramda"
import { withParentSize } from "@vx/responsive"
import { extent, select } from "d3"
import { branch, defaultProps, renameProps, renderComponent, withProps } from "recompose"
import connect from "react-redux/es/connect/connect"
import { areDataFetching, getData } from "../../reducers"
import { fetchStops } from "../../actions"
import {
  getDefaultSpaceGraphScales,
  getRadialForceSimulation,
  getRadialSpaceGraphScales,
  prepareDataForGraphSpaceVisualization
} from "./helpers"
import BEM from "../../helpers/BEM"
import "./RadialForceGraph.scss"

const b = BEM("RadialForceGraph")

const RadialForceGraph = ({ chartHeight, chartWidth, drawChart }) => {
  const rootEl = useRef(null)
  useEffect(() => drawChart(rootEl.current))
  return <svg ref={rootEl} height={chartHeight} width={chartWidth} />
}

const withDrawingChart = withProps(({ chartWidth, chartHeight, data, getVisualizationScales }) => ({
  drawChart: rootEl => {
    const graphData = prepareDataForGraphSpaceVisualization(data, true)

    const connectionsDomain = extent(graphData.nodes, path(["connections", "length"]))
    const { nodeRadiusScale, colorScale, positionScale, nodeSpaceRadiusScale } = getVisualizationScales(
      connectionsDomain
    )

    const simulation = getRadialForceSimulation(chartWidth, chartHeight, nodeSpaceRadiusScale, positionScale)
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
      .attr("id", d => JSON.stringify(d))

    const nodes = svg
      .append("g")
      .selectAll("circle")
      .data(graphData.nodes)
      .enter()
      .append("circle")
      .attr("r", d => nodeRadiusScale(d.connections.length))
      .attr("fill", d => colorScale(d.connections.length))

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

const enhancer = compose(
  defaultProps({
    width: 600,
    height: 600,
    margin: { top: 0, left: 0, bottom: 0, right: 0 },
    showLabels: false,
    showGraphWithoutExcessiveNodes: true,
    getVisualizationScales: getRadialSpaceGraphScales
  }),

  // chart size definition
  withParentSize,
  renameProps({ parentHeight: "height", parentWidth: "width" }),
  withProps(({ width, height, margin }) => ({
    chartWidth: width - (margin.left + margin.right),
    chartHeight: height - (margin.top + margin.bottom)
  })),

  connect(
    state => ({ data: getData(state), areDataFetching: areDataFetching(state) }),
    { fetchNodes: fetchStops }
  ),
  branch(({ areDataFetching }) => areDataFetching, renderComponent(() => "Preparing the visualization...")),
  withProps(
    ({ data, setData, fetchNodes, representationOf = "bristol", space = "l" }) =>
      !data && fetchNodes(representationOf, space)
  ),
  branch(({ data }) => !data, renderComponent(() => "Something went wrong. We didn`t manage to load the data...")),
  withDrawingChart
)

export default enhancer(RadialForceGraph)
