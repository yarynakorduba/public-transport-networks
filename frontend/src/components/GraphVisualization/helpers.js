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
  event,
  interpolatePlasma,
  forceRadial,
  scaleThreshold,
  scaleLog} from "d3"
import { mapIndexed } from "../../helpers/index"
import { compose } from "recompose"

//TODO: find appropriate strengths
const STRENGTH = 0.1

const MIN_NODE_SPACE = 2
const MAX_NODE_SPACE = 35
const MIN_NODE_RADIUS = 2
const MAX_NODE_RADIUS = 10
const MIN_FONT_SIZE = 0.5
const MAX_FONT_SIZE = 1

const MIN_RADIAL_NODE_SPACE = 3
const MAX_RADIAL_NODE_SPACE = MAX_NODE_RADIUS + 2
const MIN_RADIAL_NODE_RADIUS = MIN_NODE_RADIUS
const MAX_RADIAL_NODE_RADIUS = MAX_NODE_RADIUS


const nodeSpaceRadiusScale = scaleLog().range([MIN_NODE_SPACE, MAX_NODE_SPACE])
const nodeRadiusScale = scaleLog().range([MIN_NODE_RADIUS, MAX_NODE_RADIUS])
const fontSizeScale = scaleLinear().range([MIN_FONT_SIZE, MAX_FONT_SIZE])
const colorScale = scaleSequential(interpolatePlasma)

const radialNodeSpaceRadiusScale = scaleLog().range([MIN_RADIAL_NODE_SPACE, MAX_RADIAL_NODE_SPACE])
const radialNodeRadiusScale = scaleLog().range([MIN_RADIAL_NODE_RADIUS, MAX_RADIAL_NODE_RADIUS])
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
        .strength(STRENGTH*2)
    )
    .force("collide", forceCollide((d) => nodeSpaceRadiusScale(d.r)).strength(STRENGTH*2))
    .force("charge", forceManyBody())
    .force("center", forceCenter(chartWidth / 2, chartHeight / 2))
    .force("y", forceY(chartHeight / 2).strength(STRENGTH*1.5))
    .force("x", forceX(chartWidth / 2).strength(STRENGTH*1.5))


export const getRadialForceSimulation = (chartWidth:number, chartHeight:number, nodeSpaceRadiusScale:function, positionScale:function):object =>
  forceSimulation()
    .force(
      "link",
      forceLink()
        .id(prop("index"))
        .strength(STRENGTH/2)
    )
    .force("charge", forceCollide().radius(d => nodeSpaceRadiusScale(d.connections.length)).strength(0.8))
    .force(
      "r",
      forceRadial(d => positionScale(d.connections.length))
        .x(chartWidth/2)
        .y(chartHeight/2)
        .strength(0.8)
    )
    .force("collide", forceCollide((d) => nodeSpaceRadiusScale(d.r)).strength(STRENGTH*2))



export const prepareClusteredDataForGraphSpaceVisualization = (data) => {
  const stops = mapObjIndexed(d => ({ ...d, r: d.connections.length }), data)

  const byCluster = (node) => node.dbscan !== "noise" ? "cluster" + node.cluster : node.id

  const groupedStops = groupBy(byCluster, values(stops))

  const nodes = mapObjIndexed((nodesGroup, key) =>
    ({ id: key,
      connections: uniq(flatten(map(node =>
        map(connection => data[connection].dbscan !== "noise" ? `cluster${data[connection].cluster}` : connection,
        node.connections), nodesGroup)))}), groupedStops
  )

  const links = compose(
    filter(({source, target}) => source && target),
    flatten,
    mapIndexed(({ connections, id }) => map(connection => ({ source: nodes[id],
        target:nodes[connection] }), connections)
    ),
    filter(({connections}) => !isEmpty(connections)),
    values
  )(nodes)

  return {
    nodes: values(nodes),
    links
  }
}

    export const dragStarted = (simulation) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    export const dragged = () => {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    export const dragEnded = (simulation) => {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    export const getSubject = (graphData) => {
          const radius = 5
          let n = graphData.nodes.length,
            i,
            dx,
            dy,
            d2,
            s2 = radius * radius,
            circle,
            subject

          for (i = 0; i < n; ++i) {
            circle = graphData.nodes[i]
            dx = event.x - circle.x
            dy = event.y - circle.y
            d2 = dx * dx + dy * dy
            if (d2 < s2) {
              subject = circle
              s2 = d2
            }
          }
          return subject
    }

