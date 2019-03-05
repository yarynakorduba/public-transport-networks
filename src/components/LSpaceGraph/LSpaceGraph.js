import React from "react"
import { withParentSize } from "@vx/responsive"
import { branch, compose, defaultProps, lifecycle, renameProps, renderComponent, withProps } from "recompose"
import * as d3 from "d3"
import { flatten, indexOf } from "ramda"
import { connect } from "react-redux"
import { fetchNodes } from "../../actions"
import { removeDegreeTwoNode } from "../../actions/actionCreators"
import { colorScale, radiusScale } from "../../helpers/scales"
import withDrawedChart from "../HOC/drawChart"
import withDragging from "../HOC/dragging"

const LSpaceGraph = ({ chartHeight, chartWidth }) => (
  <svg className={"LSpaceGraph"} height={chartHeight} width={chartWidth} />
)

export default compose(
  connect(
    state => ({
      data: state.graph
    }),
    { fetchNodes, removeDegreeTwoNode }
  ),
  defaultProps({
    width: 300,
    height: 600,
    margin: { top: 0, left: 0, bottom: 0, right: 0 }
  }),
  withParentSize,
  renameProps({ parentHeight: "height", parentWidth: "width" }),
  withProps(({ data, setData, fetchNodes }) => !data && fetchNodes("bristol")),
  branch(({ data }) => !data, renderComponent(() => "Loading the dataset")),
  withProps(({ data, removeDegreeTwoNode }) =>
    Object.keys(data).forEach(async node => data[node].connections.length === 2 && removeDegreeTwoNode(node))
  ),
  withProps(
    ({ data, dataToDisplay }) =>
      !dataToDisplay && {
        dataToDisplay: {
          nodes: Object.keys(data).map(d => ({ ...data[d], r: data[d].connections.length })),
          links: flatten(
            Object.keys(data).map(node =>
              data[node].connections.map(connection => ({
                source: Object.keys(data).indexOf(node),
                target: indexOf(connection, Object.keys(data))
              }))
            )
          )
        }
      }
  ),
  withProps(({ width, height, margin }) => ({
    chartWidth: width - (margin.left + margin.right),
    chartHeight: height - (margin.top + margin.bottom)
  })),
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
      .force("collide", d3.forceCollide(d => (d.connections.length === 1 ? 11 : radiusScale(d.r) + 2)).strength(0.5))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
      .force("y", d3.forceY(0).strength(0.5))
      .force("x", d3.forceX(0).strength(0.5))
  })),
  withDragging,
  withProps(() => ({
    DOMElement: ".LSpaceGraph"
  })),
  withDrawedChart,
  lifecycle({
    shouldComponentUpdate({ dataToDisplay, drawChart }) {
      return !dataToDisplay ? false : drawChart()
    }
  })
)(LSpaceGraph)
