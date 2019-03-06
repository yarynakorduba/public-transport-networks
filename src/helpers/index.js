import { reduce, curry, addIndex, map, clone, without, assoc, append } from "ramda"

export const mapIndexed = addIndex(map)

export const arrayToObject = curry((keyFn, array) =>
  reduce((obj, item) => {
    obj[keyFn(item)] = item //this is mutable due to performance
    return obj
  }, {})(array)
)

const replaceConnectionsInNode = (from, to, node) =>
  assoc("connections", append(to, without([from], node.connections)), node)

/* Important!!! Be careful, mutable. */
const DANGEROUSLY_removeNodeFromTree = (nodeId, tree) => {
  const [first, second] = tree[nodeId].connections
  tree[first] = replaceConnectionsInNode(nodeId, second, tree[first])
  tree[second] = replaceConnectionsInNode(nodeId, first, tree[second])
  delete tree[nodeId]
}
export const removeNodeListFromTree = (arrayOfNodes, tree) => {
  const treeClone = clone(tree)
  arrayOfNodes.forEach(node => DANGEROUSLY_removeNodeFromTree(node, treeClone))
  return treeClone
}

export const min = (a, b) => a.connections.length - b.connections.length
export const max = (a, b) => b.connections.length - a.connections.length
