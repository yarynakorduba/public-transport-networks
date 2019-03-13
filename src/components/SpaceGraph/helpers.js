import { filter, flatten, indexOf, map, prop, values } from "ramda"
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  interpolateWarm,
  scaleLinear,
  scaleSequential,
  drag,
  event
} from "d3"
import { mapIndexed, removeNodeListFromGraph } from "../../helpers"
import { compose } from "recompose"

const STRENGTH = 0.5
const MIN_NODE_SPACE = 4
const MAX_NODE_SPACE = 50

const MIN_NODE_RADIUS = 2
const MAX_NODE_RADIUS = 12

const nodeSpaceRadiusScale = scaleLinear().range([MIN_NODE_SPACE, MAX_NODE_SPACE])
const nodeRadiusScale = scaleLinear().range([MIN_NODE_RADIUS, MAX_NODE_RADIUS])
const colorScale = scaleSequential(interpolateWarm)

export const getForceSimulation = (chartWidth, chartHeight, nodeSpaceRadiusScale) =>
  forceSimulation()
    .force(
      "link",
      forceLink()
        .id(prop("index"))
        .strength(0.8)
    )
    .force("collide", forceCollide(({ r }) => nodeSpaceRadiusScale(r)).strength(STRENGTH))
    .force("charge", forceManyBody())
    .force("center", forceCenter(chartWidth / 2, chartHeight / 2))
    .force("y", forceY(chartHeight / 2).strength(STRENGTH))
    .force("x", forceX(chartWidth / 2).strength(STRENGTH))

export const spaceGraphScales = connectionsDomain => ({
  nodeRadiusScale: nodeRadiusScale.copy().domain(connectionsDomain),
  nodeSpaceRadiusScale: nodeSpaceRadiusScale.copy().domain(connectionsDomain),
  colorScale: colorScale.copy().domain(connectionsDomain)
})

export const prepareDataForLSpaceVisualization = data => {
  const dataWithoutExcessiveNodes = removeNodeListFromGraph(
    values(filter(node => node.connections.length === 2, data)).map(node => node.id),
    data
  )
  const nodeIds = Object.keys(dataWithoutExcessiveNodes)
  return {
    nodes: map(d => ({ ...d, r: d.connections.length }), values(dataWithoutExcessiveNodes)),
    links: compose(
      flatten,
      mapIndexed(({ connections }, index) =>
        map(connection => ({ source: index, target: indexOf(connection, nodeIds) }), connections)
      ),
      values
    )(dataWithoutExcessiveNodes)
  }
}

export const getDragHandler = simulation =>
  drag()
    .on("start", d => {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    })
    .on("drag", d => {
      d.fx = event.x
      d.fy = event.y
    })
    .on("end", d => {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    })
