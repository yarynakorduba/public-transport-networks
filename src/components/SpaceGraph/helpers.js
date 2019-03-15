import { filter, flatten, indexOf, map, prop, values } from "ramda"
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  scaleLinear,
  scaleSequential,
  drag,
  event,
  interpolatePlasma
} from "d3"
import { mapIndexed, removeNodeListFromGraph } from "../../helpers"
import { compose } from "recompose"

const STRENGTH = 0.5

const MIN_NODE_SPACE = 4
const MAX_NODE_SPACE = 50
const MIN_NODE_RADIUS = 2
const MAX_NODE_RADIUS = 12
const MIN_FONT_SIZE = 0.5
const MAX_FONT_SIZE = 1

const nodeSpaceRadiusScale = scaleLinear().range([MIN_NODE_SPACE, MAX_NODE_SPACE])
const nodeRadiusScale = scaleLinear().range([MIN_NODE_RADIUS, MAX_NODE_RADIUS])
const fontSizeScale = scaleLinear().range([MIN_FONT_SIZE, MAX_FONT_SIZE])
const colorScale = scaleSequential(interpolatePlasma)

export const getDefaultSpaceGraphScales = connectionsDomain => ({
  nodeRadiusScale: nodeRadiusScale.copy().domain(connectionsDomain),
  nodeSpaceRadiusScale: nodeSpaceRadiusScale.copy().domain(connectionsDomain),
  colorScale: colorScale.copy().domain(connectionsDomain),
  fontSizeScale: fontSizeScale.copy().domain(connectionsDomain)
})

export const getForceSimulation = (chartWidth:number, chartHeight:number, nodeSpaceRadiusScale:function):object =>
  forceSimulation()
    .force(
      "link",
      forceLink()
        .id(prop("index"))
        .strength(0.5)
    )
    .force("collide", forceCollide(({ r }) => nodeSpaceRadiusScale(r)).strength(STRENGTH))
    .force("charge", forceManyBody())
    .force("center", forceCenter(chartWidth / 2, chartHeight / 2))
    .force("y", forceY(chartHeight / 2).strength(STRENGTH))
    .force("x", forceX(chartWidth / 2).strength(STRENGTH))

export const prepareDataForGraphSpaceVisualization = (data, showGraphWithoutExcessiveNodes) => {
  const graphData = showGraphWithoutExcessiveNodes
    ? removeNodeListFromGraph(values(filter(node => node.connections.length === 2, data)).map(node => node.id), data)
    : data
  const nodeIds = Object.keys(graphData)
  return {
    nodes: map(d => ({ ...d, r: d.connections.length }), values(graphData)),
    links: compose(
      flatten,
      mapIndexed(({ connections }, index) =>
        map(connection => ({ source: index, target: indexOf(connection, nodeIds) }), connections)
      ),
      values
    )(graphData)
  }
}

export const getDragHandler = (simulation:object):function =>
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
