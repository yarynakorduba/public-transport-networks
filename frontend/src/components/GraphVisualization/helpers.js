// @flow
import { flatten, isEmpty, map, mapObjIndexed, prop, filter, values, groupBy, uniq } from "ramda"

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
const MAX_NODE_RADIUS = 15
const MIN_FONT_SIZE = 0.5
const MAX_FONT_SIZE = 1

const MIN_RADIAL_NODE_SPACE = 3
const MAX_RADIAL_NODE_SPACE = MAX_NODE_RADIUS + 2
const MIN_RADIAL_NODE_RADIUS = MIN_NODE_RADIUS
const MAX_RADIAL_NODE_RADIUS = MAX_NODE_RADIUS


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



export const getForceSimulation = (chartWidth:number, chartHeight:number, nodeSpaceRadiusScale):object =>
  forceSimulation()
    .force(
      "link",
      forceLink()
        .id(prop("index"))
        .strength(STRENGTH*4)
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
  const nodes = mapObjIndexed(d => {
    return ({ ...d, r: d.connections.length })}, data)

  const byCluster = (node) => {
    return node.dbscan !== "noise" ? "cluster" + node.cluster : node.id
  }

  const groupedNodes = groupBy(byCluster, values(nodes))

  const nodesAndClusters = mapObjIndexed((nodesGroup, key) =>
    ({ id: key,
      connections: uniq(flatten(map(node => node.connections, nodesGroup)))}), groupedNodes
  )


  const links = compose(
    flatten,
    mapIndexed(({ connections, id }) => {
      const source = data[id].dbscan !== "noise" ? nodesAndClusters[`cluster${data[id].cluster}`] :
        nodesAndClusters[id]
      return map(connection => {
        const target = data[connection].dbscan !== "noise" ? nodesAndClusters[`cluster${data[connection].cluster}`] :
          nodesAndClusters[connection]
        return ({ source, target })
      }, connections)
    }),
    filter(n => !isEmpty(n.connections)),
    values
  )(data)

  return {
    nodes: values(nodesAndClusters),
    links: links
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


