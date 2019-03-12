import React from "react"
import { withParentSize } from "@vx/responsive"
import { branch, compose, defaultProps, lifecycle, renameProps, renderComponent, withProps } from "recompose"
import { extent, select, drag, event } from "d3"
import { flatten, indexOf, values, map, filter, prop, path } from "ramda"
import { connect } from "react-redux"
import { fetchStops } from "../../actions"

import { removeNodeListFromGraph, mapIndexed } from "../../helpers"
import { areDataFetching, getData } from "../../reducers"

import "./SpaceGraph.scss"
import BEM from "../../helpers/BEM"
import { getForceSimulation, spaceGraphScales } from "./helpers"
const b = BEM("SpaceGraph")

const SpaceGraph = ({ chartHeight, chartWidth, classNameOfVisualizationContainer }) => (
  <svg className={classNameOfVisualizationContainer} height={chartHeight} width={chartWidth} />
)

const prepareDataForLSpaceVisualization = data => {
  const dataWithoutExcessiveNodes = removeNodeListFromGraph(
    values(filter(node => node.connections.length === 2, data)).map(node => node.id),
    data
  )
  const nodeIds = Object.keys(dataWithoutExcessiveNodes)
  return {
    nodes: map(d => ({ ...d, r: d.connections.length }), values(dataWithoutExcessiveNodes)),
    links: compose(
      flatten,
      mapIndexed(({ connections }, index) =>
        map(connection => ({ source: index, target: indexOf(connection, nodeIds) }), connections)
      ),
      values
    )(dataWithoutExcessiveNodes)
  }
}

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
  withProps(({ data }) => ({ data: prepareDataForLSpaceVisualization(data) })),

  // visualization preparation
  withProps(({ chartWidth, chartHeight, data, classNameOfVisualizationContainer, showLabels }) => ({
    drawChart: () => {
      const connectionsDomain = extent(data.nodes, path(["connections", "length"]))
      const { nodeRadiusScale, nodeSpaceRadiusScale, colorScale } = spaceGraphScales(connectionsDomain)
      const simulation = getForceSimulation(chartWidth, chartHeight, nodeSpaceRadiusScale)

      const dragNode = drag()
        .on("start", d => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        })
        .on("drag", d => {
          d.fx = event.x
          d.fy = event.y
        })
        .on("end", d => {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        })

      const svg = select(`.${classNameOfVisualizationContainer}`)
      svg.selectAll("*").remove()

      const link = svg
        .append("g")
        .attr("class", b("links"))
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .attr("class", b("line"))

      const node = svg
        .append("g")
        .attr("class", b("nodes"))
        .selectAll(b("node"))

        .data(data.nodes)
        .enter()
        .append("g")
        .attr("class", b("node"))

      node.call(dragNode)

      node
        .append("circle")
        .attr("fill", d => colorScale(d.connections.length))
        .attr("r", ({ r }) => nodeRadiusScale(r))

      if (showLabels) {
        node
          .append("g")
          .attr("class", b("labels"))
          .append("text")
          .attr("class", b("text-label"))
          .text(prop("label"))
      }

      simulation
        .nodes(data.nodes)
        .on("tick", () => {
          link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)

          node.attr("transform", ({ x, y }) => `translate(${x}, ${y})`)
        })
        .force("link")
        .links(data.links)
    }
  })),
  lifecycle({
    componentDidMount() {
      return !this.props.data ? false : this.props.drawChart()
    }
  })
)(SpaceGraph)
