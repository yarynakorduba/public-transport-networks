import { reduce, curry, addIndex, map, clone, without, assoc, append } from "ramda"

export const mapIndexed = addIndex(map)

export const arrayToObject = curry((keyFn:function, array:object):object =>
  reduce((obj:object, item:object):object => {
    obj[keyFn(item)] = item //this is mutable due to performance
    return obj
  }, {})(array)
)

const replaceConnectionsInNode = (from:string, to:string, node:object):object =>
  assoc("connections", append(to, without([from], node.connections)), node)

/* Important!!! Be careful, mutable. */
const DANGEROUSLY_removeNodeFromGraph = (nodeId:string, graph:object) => {
  const [first, second] = graph[nodeId].connections
  graph[first] = replaceConnectionsInNode(nodeId, second, graph[first])
  graph[second] = replaceConnectionsInNode(nodeId, first, graph[second])
  delete graph[nodeId]
}
export const removeNodeListFromGraph = (arrayOfNodes:object, graph:object) => {
  const graphClone = clone(graph)
  arrayOfNodes.forEach(node => DANGEROUSLY_removeNodeFromGraph(node, graphClone))
  return graphClone
}

export const min = (a:object, b:object):number => a.connections.length - b.connections.length
export const max = (a:object, b:object):number => b.connections.length - a.connections.length
