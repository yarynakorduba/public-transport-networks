import * as d3 from "d3"
import React, { Component } from "react"

class LSpaceGraph extends Component {
  static defaultProps = {
    width: 700,
    height: 700,
    margin: { top: 0, left: 0, bottom: 0, right: 0 }
  }

  componentDidMount(prevProps, prevState, snapshot) {
    const svg = d3.select("#graph").append("svg")
    const chartLayer = svg.append("g").classed("chartLayer", true)
    this.main(svg, chartLayer)
    // return true
  }

  setSize = (data, svg, chartLayer) => {
    const { width, height, margin } = this.props
    const chartWidth = width - (margin.left + margin.right)
    const chartHeight = height - (margin.top + margin.bottom)

    svg.attr("width", width).attr("height", height)

    chartLayer
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("transform", "translate(" + [margin.left, margin.top] + ")")
  }

  main = (svg, chartLayer) => {
    if (!svg) return
    const range = 100
    const data = {
      nodes: d3.range(0, range).map(d => ({ label: "l" + d, r: ~~d3.randomUniform(8, 28)() })),
      links: d3.range(0, range).map(() => ({
        source: ~~d3.randomUniform(range)(),
        target: ~~d3.randomUniform(range)()
      }))
    }

    this.setSize(data, svg, chartLayer)
    this.drawChart(data, svg)
  }

  drawChart = (data, svg) => {
    const { width, height, margin } = this.props
    const chartWidth = width - margin.right - margin.left
    const chartHeight = height - margin.top - margin.bottom
    const simulation = d3
      .forceSimulation()
      .force("link", d3.forceLink().id(d => d.index))
      .force("collide", d3.forceCollide(d => d.r + 8).iterations(16))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
      .force("y", d3.forceY(0))
      .force("x", d3.forceX(0))

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
      .attr("r", function(d) {
        return d.r
      })
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

    const dragstarted = d => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    const dragged = d => {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    const dragended = d => {
      if (!d3.event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }
  }

  render() {
    return <div style={{overflow: "visible"}} id={"graph"} />
  }
}

export default LSpaceGraph
