import { path, prop } from "ramda"
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
  scaleSequential
} from "d3"

const STRENGTH = 0.2
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
        .strength(STRENGTH)
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
