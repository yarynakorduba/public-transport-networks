import React, { Component } from "react"
import { getBristolLSpaceGraph } from "../../api"
import * as d3 from "d3"

class LSpaceGraph extends Component {
  static defaultProps = {
    width: 1600 * 2,
    height: 600 * 2,
    margin: { top: 0, left: 0, bottom: 0, right: 0 }
  }

  state = {
    data: []
  }

  constructor(props) {
    super(props)
    getBristolLSpaceGraph("bristol").then(data => {
      return this.setState({ data })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("render")
    if (nextState.data.length === 0) return true

    const { width, height, margin } = this.props

    const chartWidth = width - (margin.left + margin.right)
    const chartHeight = height - (margin.top + margin.bottom)

    const svg = d3.select(this.refs.root)

    const drawChart = data => {
      const simulation = d3
        .forceSimulation()
        .force("link", d3.forceLink().id(d => d.index))
        .force("collide", d3.forceCollide(d => d.r + 8).iterations(16))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
        .force("y", d3.forceY(0))
        .force("x", d3.forceX(0))

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

    const [graphNodes, graphEdges] = nextState.data

    const data = {
      nodes: graphNodes.map(d => ({ label: d, r: ~~d3.randomUniform(1, 3)() })),
      links: graphEdges.map(([source, target]) => ({
        source: graphNodes.indexOf(source),
        target: graphNodes.indexOf(target)
      }))
    }

    drawChart(data)

    return false
  }

  render() {
    const { height, width } = this.props
    return <svg ref="root" height={height} width={width} />
  }
}

export default LSpaceGraph
