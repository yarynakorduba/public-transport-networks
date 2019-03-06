import React from "react"
import { withParentSize } from "@vx/responsive"
import { branch, compose, defaultProps, lifecycle, renderComponent, withProps } from "recompose"
import * as d3 from "d3"
import { flatten, indexOf } from "ramda"
import { connect } from "react-redux"
import { fetchStops } from "../../actions"
import { removeDegreeTwoNode } from "../../actions/actionCreators"
import { radiusGraphScale } from "../../helpers/scales"
import withDrawedChart from "../HOC/drawChart"
import withDragging from "../HOC/dragging"
import { min, max } from "../../helpers"

const CSpaceGraph = ({ chartHeight, chartWidth }) => (
  <svg className={"CSpaceGraph"} height={chartHeight} width={chartWidth} />
)

export default compose(
  connect(
    state => ({
      data: state.graph
    }),
    { fetchNodes: fetchStops, removeDegreeTwoNode }
  ),
  defaultProps({
    margin: { top: 0, left: 0, bottom: 0, right: 0 }
  }),
  withParentSize,
  withProps(({ parentWidth, parentHeight, margin }) => ({
    chartWidth: parentWidth - (margin.left + margin.right),
    chartHeight: parentHeight - (margin.top + margin.bottom),
    DOMElement: ".CSpaceGraph",
    colorConfig: { domain: [2, 40] }
  })),
  withProps(({ data, setData, fetchNodes }) => !data && fetchNodes("bristol", "c")),
  branch(({ data }) => !data, renderComponent(() => "Loading the dataset")),
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
  withProps(({ dataToDisplay: { nodes } }) => ({
    minDegree: nodes[d3.scan(nodes, min)].connections.length,
    maxDegree: nodes[d3.scan(nodes, max)].connections.length
  })),
  withProps(({ chartWidth, chartHeight, minDegree, maxDegree }) => ({
    simulation: d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id(d => d.index)
          .strength(1)
      )
      .force("collide", d3.forceCollide(d => radiusGraphScale([minDegree, maxDegree])(d.r) + 15).strength(0.5))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
      .force("y", d3.forceY(0).strength(1))
      .force("x", d3.forceX(0).strength(1))
  })),
  withDragging,

  withDrawedChart,
  lifecycle({
    componentDidMount() {
      return !this.props.dataToDisplay ? false : this.props.drawChart()
    }
  })
)(CSpaceGraph)
