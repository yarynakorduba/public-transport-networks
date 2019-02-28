import React from "react"
import { withParentSize } from "@vx/responsive"
import { branch, compose, defaultProps, lifecycle, pure, renameProps, renderComponent, withProps } from "recompose"
import * as d3 from "d3"
import { flatten, indexOf } from "ramda"
import { withDragging } from "../HOC/dragging"
import { connect } from "react-redux"
import { fetchNodes, removeDegreeTwoNode } from "../../actions"

const colorScale = d3
  .scaleThreshold()
  .domain([2, 5])
  .range(["white", "#f3dd6f", "#F3CC06"])

const radiusScale = d3
  .scaleLinear()
  .domain([1, 10])
  .range([2, 11])

const LSpaceGraph = ({ chartHeight, chartWidth }) => <svg height={chartHeight} width={chartWidth} />

export default compose(
  pure,
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
  withProps(async ({ data, removeDegreeTwoNode }) =>
    Object.keys(data).forEach(async node => data[node].connections.length === 2 && (await removeDegreeTwoNode(node)))
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

  withProps(({ dataToDisplay, dragstarted, dragended, dragged, simulation }) => ({
    drawChart: () => {
      const svg = d3.select("svg")
      svg.selectAll("*").remove()
      const link = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(dataToDisplay.links)
        .enter()
        .append("line")
        .attr("stroke", "#1F1A40")
        .attr("strokeWidth", "0.4504")

      const node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(dataToDisplay.nodes)
        .enter()
        .append("circle")
        .attr("fill", d => colorScale(d.connections.length))
        .attr("r", d => radiusScale(d.r))
        .on("click", d => console.log(d))

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
      simulation.nodes(dataToDisplay.nodes).on("tick", ticked)
      simulation.force("link").links(dataToDisplay.links)
      return false
    }
  })),
  lifecycle({
    shouldComponentUpdate({ dataToDisplay, drawChart }) {
      return !dataToDisplay ? false : drawChart()
    }
  })
)(LSpaceGraph)
