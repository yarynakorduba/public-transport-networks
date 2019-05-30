// @flow
import { addIndex, append, assoc, clone, curry, map, reduce, without } from "ramda"
import { featureCollection } from "@turf/helpers"

export const mapIndexed = addIndex(map)

export const arrayToObject = curry(
  (keyFn: Function, array: []): {} =>
    reduce((obj: {}, item: {}): {} => {
      obj[keyFn(item)] = item //this is mutable due to performance
      return obj
    }, {})(array)
)

const replaceConnectionsInNode = (from: string, to: string, node: {}): {} =>
  assoc("connections", append(to, without([from], node.connections)), node)

/* Important!!! Be careful, mutable. */
const DANGEROUSLY_removeNodeFromGraph = (nodeId: string, graph: {}) => {
  const [first, second] = graph[nodeId].connections
  graph[first] = replaceConnectionsInNode(nodeId, second, graph[first])
  graph[second] = replaceConnectionsInNode(nodeId, first, graph[second])

  delete graph[nodeId]
}

type _removeNodeListFromGraph = <G>([any], G) => G
export const removeNodeListFromGraph: _removeNodeListFromGraph = (arrayOfNodes, graph) => {
  const graphClone = clone(graph)
  arrayOfNodes.forEach(node => DANGEROUSLY_removeNodeFromGraph(node, graphClone))
  return graphClone
}
export const convertBusStopsDataToGeoJSON = data =>
  featureCollection(
    data.map(({ lat, lon, ...rest }) => ({
      type: "Feature",
      properties: { lat, lon, ...rest, connectedRoutes: 1 }, //TODO: experiment with routes
      geometry: { type: "Point", coordinates: [lon, lat] }
    }))
  )

export const convertBusStopsGeoJSONToJson = geoJSONStops => geoJSONStops.features.map(stop => stop.properties)
