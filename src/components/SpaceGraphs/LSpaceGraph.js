import React from "react"
import { withParentSize } from "@vx/responsive"
import { branch, compose, defaultProps, renameProps, renderComponent, withProps } from "recompose"
import * as d3 from "d3"
import { flatten, indexOf, values, map, filter } from "ramda"
import { connect } from "react-redux"
import { fetchStops } from "../../actions"
import { radiusGraphScale } from "../../helpers/scales"
import withDrawedChart from "../HOC/drawChart"
import withDragging from "../HOC/dragging"
import { removeNodeListFromGraph, mapIndexed } from "../../helpers"

const prepareDataForLSpaceVisualization = data => {
  data = removeNodeListFromGraph(values(filter(node => node.connections.length === 2, data)).map(node => node.id), data)
  const nodeIds = Object.keys(data)
  return {
    nodes: map(d => ({ ...d, r: d.connections.length }), values(data)),
    links: compose(
      flatten,
      mapIndexed(({ connections }, index) =>
        map(connection => ({ source: index, target: indexOf(connection, nodeIds) }), connections)
      ),
      values
    )(data)
  }
}

const LSpaceGraph = ({ chartHeight, chartWidth }) => (
  <svg className={"LSpaceGraph"} height={chartHeight} width={chartWidth} />
)

export default compose(

  defaultProps({
    width: 600,
    height: 600,
    margin: { top: 0, left: 0, bottom: 0, right: 0 },
    colorConfig: { domain: [1, 4] },
    classNameOfVisualizationContainer: ".LSpaceGraph" //dom element for visualization, visualization container
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
    state => ({ data: state.graph }),
    { fetchNodes: fetchStops }
  ),
  withProps(({ data, setData, fetchNodes }) => !data && fetchNodes("bristol", "l")),
  branch(({ data }) => !data, renderComponent(() => "Loading the dataset")),
  withProps(({ data }) => ({ data: prepareDataForLSpaceVisualization(data) })),

  // visualization preparation
  withProps(({ chartWidth, chartHeight }) => ({
    simulation: d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id(d => d.index)
          .strength(0.8)
      )
      .force(
        "collide",
        d3.forceCollide(d => (d.connections.length === 1 ? 11 : radiusGraphScale([1, 10])(d.r) + 2)).strength(0.5)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
      .force("y", d3.forceY(0).strength(0.5))
      .force("x", d3.forceX(0).strength(0.5))
  })),
  withDragging,
  withProps(({ data: { nodes } }) => ({
    minDegree: nodes[d3.scan(nodes, (a, b) => a.connections.length - b.connections.length)].connections.length,
    maxDegree: nodes[d3.scan(nodes, (a, b) => b.connections.length - a.connections.length)].connections.length
  })),
  withDrawedChart
)(LSpaceGraph)
