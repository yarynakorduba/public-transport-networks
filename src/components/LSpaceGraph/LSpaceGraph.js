import React, { Component } from "react"
import { getBristolLSpaceGraph, getBristolLSpaceGraphNodes } from "../../api"
import { withParentSize } from "@vx/responsive"
import { branch, compose, defaultProps, renameProps, renderComponent, withProps, withState } from "recompose"
import * as d3 from "d3"
import { findIndex, flatten, propEq } from "ramda"
import { withDragging } from "../HOC/dragging"
import { connect } from "react-redux"
import { fetchNodes } from "../../actions"

const colorScale = d3.scaleOrdinal(["white", "yellow", "green"])

class LSpaceGraph extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.data.length === 0) return true

    const { dragstarted, dragged, dragended, simulation, data } = this.props
    const svg = d3.select(this.refs.root)

    const drawChart = data => {
      const link = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .attr("stroke", "black")

      const node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("fill", d => "yellow")
        .attr("r", d => d.r)
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        )

      const ticked = () => {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y)
        node.attr("cx", d => d.x).attr("cy", d => d.y)
      }

      simulation.nodes(data.nodes).on("tick", ticked)
      simulation.force("link").links(data.links)
    }
    // drawChart(data)
    return false
  }
  render() {
    const { height, width } = this.props
    return <svg ref="root" height={height} width={width} />
  }
}

export default compose(
  connect(
    state => ({
      data: state.graph
    }),
    { fetchNodes }
  ),
  defaultProps({
    width: 1600 * 2,
    height: 600 * 2,
    margin: { top: 0, left: 0, bottom: 0, right: 0 }
  }),
  withParentSize,
  renameProps({ parentHeight: "height", parentWidth: "width" }),
  withProps(({ data, setData, fetchNodes }) => console.log(data) || (!data && fetchNodes("bristol"))),
  withProps(({ data }) => console.log(data) || data),
  branch(({ data }) => !data, renderComponent(() => "Loading the dataset")),
  // withProps(({ data }) => {
  //   const stopsWithDegreeTwo = []
  //   return {
  //     data: {
  //       nodes: data.map(d => ({ ...d, r: d.connections.length })),
  //       links: flatten(
  //         data.map(node =>
  //           node.connections.length === 2
  //             ? {return node.connections}
  //             : node.connections.map(connection => [data.indexOf(node), findIndex(propEq("id", connection))(data)])
  //         )
  //       )
  //     }
  //   }
  // }),
  withProps(({ width, height, margin }) => ({
    chartWidth: width - (margin.left + margin.right),
    chartHeight: height - (margin.top + margin.bottom)
  })),
  withProps(({ chartWidth, chartHeight }) => ({
    simulation: d3
      .forceSimulation()
      .force("link", d3.forceLink().id(d => d.index))
      .force("collide", d3.forceCollide(d => d.r + 8).iterations(16))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
      .force("y", d3.forceY(0))
      .force("x", d3.forceX(0))
  })),
  withDragging
)(LSpaceGraph)
