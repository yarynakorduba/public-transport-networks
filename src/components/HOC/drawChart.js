import { withProps, compose, lifecycle } from "recompose"
import * as d3 from "d3"
import { colorScale, radiusGraphScale } from "../../helpers/scales"
import withDragging from "./dragging"

const withDrawedChart = compose(
  withProps(
    ({
      data: { nodes, links },
      dragstarted,
      dragended,
      dragged,
      simulation,
      classNameOfVisualizationContainer,
      minDegree,
      maxDegree,
      colorConfig: { domain },
      showLabels = false
    }) => ({
      drawChart: () => {
        const svg = d3.select(`.${classNameOfVisualizationContainer}`)
        svg.selectAll("*").remove()
        const link = svg
          .append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(links)
          .enter()
          .append("line")
          .attr("stroke", "#1F1A40")
          .attr("strokeWidth", "0.4504")

        const node = svg
          .append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(nodes)
          .enter()
          .append("circle")
          .attr("fill", d => colorScale(domain)(d.connections.length))
          .attr("r", d => radiusGraphScale([minDegree, maxDegree])(d.r))
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
            .data(nodes)
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
        simulation.nodes(nodes).on("tick", ticked)
        simulation.force("link").links(links)
        return false
      }
    })
  ),
  lifecycle({
    componentDidMount() {
      return !this.props.data ? false : this.props.drawChart()
    }
  })
)

export default withDrawedChart
