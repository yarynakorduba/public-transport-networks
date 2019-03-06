import { reduce, curry, addIndex, map, filter, without } from "ramda"

export const mapIndexed = addIndex(map)

export const arrayToObject = curry((keyFn, array) =>
  reduce((obj, item) => {
    obj[keyFn(item)] = item //this is mutable due to performance
    return obj
  }, {})(array)
)

const removeNodeFromTree = (nodeId, treeClone) => {
  const [first, second] = treeClone[nodeId].connections
  treeClone[first] = {
    ...treeClone[first],
    connections: [...without([nodeId], treeClone[first].connections), second]
  }
  treeClone[second] = {
    ...treeClone[second],
    connections: [...without([nodeId], treeClone[second].connections), first]
  }

  delete treeClone[nodeId]
}
export const removeNodeListFromTree = (arrayOfNodes, tree) => {
  const treeClone = JSON.parse(JSON.stringify(tree))
  arrayOfNodes.forEach(node => removeNodeFromTree(node, treeClone))
  return treeClone
}

export const min = (a, b) => a.connections.length - b.connections.length
export const max = (a, b) => b.connections.length - a.connections.length
