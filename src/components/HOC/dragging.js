import { withProps } from "recompose"
import * as d3 from "d3"

const withDragging = withProps(({ simulation }) => ({
  dragstarted: d => {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  },
  dragged: d => {
    d.fx = d3.event.x
    d.fy = d3.event.y
  },
  dragended: d => {
    if (!d3.event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }
}))
export default withDragging
