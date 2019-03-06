import React from "react"
import { withParentSize } from "@vx/responsive"
import { branch, compose, defaultProps, lifecycle, renameProps, renderComponent, withProps } from "recompose"
import * as d3 from "d3"
import { flatten, indexOf, values, addIndex, map, filter } from "ramda"
import { connect } from "react-redux"
import { fetchStops } from "../../actions"
import { radiusGraphScale } from "../../helpers/scales"
import withDrawedChart from "../HOC/drawChart"
import withDragging from "../HOC/dragging"
import { max, min, removeNodeListFromTree } from "../../helpers"

const LSpaceGraph = ({ chartHeight, chartWidth }) => (
  <svg className={"LSpaceGraph"} height={chartHeight} width={chartWidth} />
)

const mapIndexed = addIndex(map)

export default compose(
  connect(
    state => ({
      data: state.graph
    }),
    { fetchNodes: fetchStops }
  ),
  defaultProps({
    width: 600,
    height: 600,
    margin: { top: 0, left: 0, bottom: 0, right: 0 },
    colorConfig: { domain: [1, 4] }
  }),
  withParentSize,
  renameProps({ parentHeight: "height", parentWidth: "width" }),
  withProps(({ data, setData, fetchNodes }) => !data && fetchNodes("bristol", "l")),
  branch(({ data }) => !data, renderComponent(() => "Loading the dataset")),
  withProps(({ data }) => ({
    data: removeNodeListFromTree(values(filter(node => node.connections.length === 2, data)).map(node => node.id), data)
  })),

  withProps(({ data }) => {
    console.log(data)
    const nodeIds = Object.keys(data)
    return {
      dataToDisplay: {
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
  }),
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
  withProps(() => ({
    DOMElement: ".LSpaceGraph"
  })),
  withProps(({ dataToDisplay: { nodes } }) => ({
    minDegree: nodes[d3.scan(nodes, min)].connections.length,
    maxDegree: nodes[d3.scan(nodes, max)].connections.length
  })),
  withDrawedChart,
  lifecycle({
    componentDidMount() {
      return !this.props.dataToDisplay ? false : this.props.drawChart()
    }
  })
)(LSpaceGraph)
