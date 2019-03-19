// @flow
import { reduce, curry, addIndex, map, clone, without, assoc, append } from "ramda"

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


