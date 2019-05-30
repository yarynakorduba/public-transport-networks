import { flatten, indexOf, map, prop, values } from "ramda"

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
  interpolatePlasma,
  forceRadial,
  scaleThreshold
} from "d3"
import { mapIndexed } from "../../helpers/index"
import { compose } from "recompose"

const STRENGTH = 0.1

const MIN_NODE_SPACE = 2
const MAX_NODE_SPACE = 35
const MIN_NODE_RADIUS = 2
const MAX_NODE_RADIUS = 12
const MIN_FONT_SIZE = 0.5
const MAX_FONT_SIZE = 1

const MIN_RADIAL_NODE_SPACE = 3
const MAX_RADIAL_NODE_SPACE = 12
const MIN_RADIAL_NODE_RADIUS = 2
const MAX_RADIAL_NODE_RADIUS = 10


const nodeSpaceRadiusScale = scaleLinear().range([MIN_NODE_SPACE, MAX_NODE_SPACE])
const nodeRadiusScale = scaleLinear().range([MIN_NODE_RADIUS, MAX_NODE_RADIUS])
const fontSizeScale = scaleLinear().range([MIN_FONT_SIZE, MAX_FONT_SIZE])
const colorScale = scaleSequential(interpolatePlasma)

const radialNodeSpaceRadiusScale = scaleLinear().range([MIN_RADIAL_NODE_SPACE, MAX_RADIAL_NODE_SPACE])
const radialNodeRadiusScale = scaleLinear().range([MIN_RADIAL_NODE_RADIUS, MAX_RADIAL_NODE_RADIUS])
const radialColorScale = scaleSequential(interpolatePlasma)
const radialPositionScale = scaleThreshold().range([250, 180, 120, 70, 10])


export const getDefaultSpaceGraphScales = connectionsDomain => ({
  nodeRadiusScale: nodeRadiusScale.copy().domain(connectionsDomain),
  nodeSpaceRadiusScale: nodeSpaceRadiusScale.copy().domain(connectionsDomain),
  colorScale: colorScale.copy().domain(connectionsDomain),
  fontSizeScale: fontSizeScale.copy().domain(connectionsDomain)
})

export const getRadialSpaceGraphScales = connectionsDomain => ({
  nodeRadiusScale: radialNodeRadiusScale.copy().domain(connectionsDomain),
  nodeSpaceRadiusScale: radialNodeSpaceRadiusScale.copy().domain(connectionsDomain),
  colorScale: radialColorScale.copy().domain(connectionsDomain),
  positionScale: radialPositionScale.copy().domain([2, 4, 5, 7])
})



export const getForceSimulation = (chartWidth:number, chartHeight:number, nodeSpaceRadiusScale:function):object =>
  forceSimulation()
    .force(
      "link",
      forceLink()
        .id(prop("index"))
        .strength(STRENGTH*2)
    )
    .force("collide", forceCollide(({ r }) => nodeSpaceRadiusScale(r)).strength(STRENGTH))
    .force("charge", forceManyBody())
    .force("center", forceCenter(chartWidth / 2, chartHeight / 2))
    .force("y", forceY(chartHeight / 2).strength(STRENGTH*2))
    .force("x", forceX(chartWidth / 2).strength(STRENGTH*2))


export const getRadialForceSimulation = (chartWidth:number, chartHeight:number, nodeSpaceRadiusScale:function, positionScale:function):object =>
  forceSimulation()
    .force(
      "link",
      forceLink()
        .id(prop("index"))
        .strength(STRENGTH/2)
    )
    .force("charge", forceCollide().radius(d => nodeSpaceRadiusScale(d.connections.length)).strength(0.6))
    .force(
      "r",
      forceRadial(d => positionScale(d.connections.length))
        .x(chartWidth/2)
        .y(chartHeight/2)
        .strength(1)
    )


export const prepareDataForGraphSpaceVisualization = (data) => {
  const graphData = data
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


