import { withProps, compose } from "recompose"
import * as d3 from "d3"
import { radiusScale } from "../../helpers/scales"
import withDragging from "./dragging"

const withDrawedChart = compose(
  withProps(({ dataToDisplay, dragstarted, dragended, dragged, simulation, DOMElement, showLabels = false }) => ({
    drawChart: () => {
      const svg = d3.select(DOMElement)
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
        .attr("fill", d => (+d.id === 3 ? "orange" : +d.id > 5 ? "lightgreen" : "yellow"))
        .attr("r", d => radiusScale(d.r) + 5)
        .on("click", d => console.log(d))
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        )

      const text =
        showLabels &&
        svg
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
        showLabels && text.attr("transform", d => "translate(" + d.x + ", " + d.y + ")")
      }
      simulation.nodes(dataToDisplay.nodes).on("tick", ticked)
      simulation.force("link").links(dataToDisplay.links)
      return false
    }
  })),
  withDragging
)

export default withDrawedChart
