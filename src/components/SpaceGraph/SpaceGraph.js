import React from "react"
import { withParentSize } from "@vx/responsive"
import { branch, compose, defaultProps, renameProps, renderComponent, withProps } from "recompose"
import { forceCollide, forceSimulation, scan, forceManyBody, forceCenter, forceY, forceX, forceLink } from "d3"
import { flatten, indexOf, values, map, filter } from "ramda"
import { connect } from "react-redux"
import { fetchStops } from "../../actions"
import { radiusGraphScale } from "../../helpers/scales"
import withDrawedChart from "../HOC/drawChart"
import withDragging from "../HOC/dragging"
import { removeNodeListFromGraph, mapIndexed } from "../../helpers"
import { areDataFetching, getData } from "../../reducers"

const SpaceGraph = ({ chartHeight, chartWidth, classNameOfVisualizationContainer }) => (
  <svg className={classNameOfVisualizationContainer} height={chartHeight} width={chartWidth} />
)

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

export default compose(
  defaultProps({
    width: 600,
    height: 600,
    margin: { top: 0, left: 0, bottom: 0, right: 0 },
    colorConfig: { domain: [1, 4] }
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
  withProps(({ chartWidth, chartHeight }) => ({
    simulation: forceSimulation()
      .force(
        "link",
        forceLink()
          .id(d => d.index)
          .strength(0.8)
      )
      .force(
        "collide",
        forceCollide(d => (d.connections.length === 1 ? 11 : radiusGraphScale([1, 10])(d.r) + 2)).strength(0.5)
      )
      .force("charge", forceManyBody())
      .force("center", forceCenter(chartWidth / 2, chartHeight / 2))
      .force("y", forceY(0).strength(0.5))
      .force("x", forceX(0).strength(0.5))
  })),
  withDragging,
  withProps(({ data: { nodes } }) => ({
    minDegree: nodes[scan(nodes, (a, b) => a.connections.length - b.connections.length)].connections.length,
    maxDegree: nodes[scan(nodes, (a, b) => b.connections.length - a.connections.length)].connections.length
  })),
  withDrawedChart
)(SpaceGraph)
