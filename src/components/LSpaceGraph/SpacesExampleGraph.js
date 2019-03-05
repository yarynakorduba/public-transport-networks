import React from "react"
import { compose, defaultProps, lifecycle, withProps } from "recompose"
import * as d3 from "d3"
import { flatten, indexOf } from "ramda"
import withDragging from "../HOC/dragging"
import { connect } from "react-redux"
import { fetchNodes } from "../../actions"
import { removeDegreeTwoNode } from "../../actions/actionCreators"
import { radiusScale } from "../../helpers/scales"
import { examplePSpaceData } from "../../helpers/examplesData"
import withDrawedChart from "../HOC/drawChart"

const SpacesExampleGraph = ({ chartHeight, chartWidth }) => <svg height={chartHeight} width={chartWidth} />

export default compose(
  connect(
    state => ({
      data: state.graph
    }),
    { fetchNodes, removeDegreeTwoNode }
  ),
  defaultProps({
    width: 550,
    height: 350,
    margin: { top: 0, left: 0, bottom: 0, right: 0 }
  }),
  withProps(({ data }) => !data && { data: examplePSpaceData }),
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
      .force("collide", d3.forceCollide(d => radiusScale(d.r + 10) + 20).strength(0.3))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
      .force("y", d3.forceY(0).strength(0))
      .force("x", d3.forceX(0).strength(0))
  })),
  withDragging,
  withProps(() => ({
    DOMElement: "svg"
  })),
  withDrawedChart,
  lifecycle({
    componentDidMount() {
      const resp = !this.props.dataToDisplay ? false : this.props.drawChart()
      return true
    }
  })
)(SpacesExampleGraph)
