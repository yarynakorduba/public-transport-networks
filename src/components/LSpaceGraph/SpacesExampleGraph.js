import React from "react"
import { withParentSize } from "@vx/responsive"
import { compose, defaultProps, lifecycle, renameProps, withProps } from "recompose"
import * as d3 from "d3"
import { flatten, indexOf } from "ramda"
import { withDragging } from "../HOC/dragging"
import { connect } from "react-redux"
import { fetchNodes } from "../../actions"
import { removeDegreeTwoNode } from "../../actions/actionCreators"
import { radiusScale } from "../../helpers/scales"
import { exampleCSpaceData } from "../../helpers/examplesData"

const SpacesExampleGraph = ({ chartHeight, chartWidth }) => <svg height={chartHeight} width={chartWidth} />

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
  withProps(({ data }) => !data && { data: exampleCSpaceData }),
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
  withProps(
    ({ width, height, margin, ...props }) =>
      console.log("===> ", props) || {
        chartWidth: width - (margin.left + margin.right),
        chartHeight: height - (margin.top + margin.bottom)
      }
  ),
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
        .attr("fill", d => (+d.id > 1 ? "lightgreen" : "yellow"))
        .attr("r", d => radiusScale(d.r) + 5)
        .on("click", d => console.log(d))
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        )

      const text = svg
        .append("g")
        .attr("class", "labels")
        .selectAll("label")
        .data(dataToDisplay.nodes)
        .enter()
        .append("text")
        .attr("class", "text-label")
        .text(d => d.label)
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
        text.attr("transform", d => "translate(" + d.x + ", " + d.y + ")")
      }
      console.log(link, node)
      simulation.nodes(dataToDisplay.nodes).on("tick", ticked)
      simulation.force("link").links(dataToDisplay.links)
      return false
    }
  })),
  lifecycle({
    componentDidMount() {
      const resp = !this.props.dataToDisplay ? false : this.props.drawChart()
      return true
    }
  })
)(SpacesExampleGraph)
