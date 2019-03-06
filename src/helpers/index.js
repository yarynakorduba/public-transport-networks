import { reduce, curry, addIndex, map } from "ramda"

export const mapIndexed = addIndex(map)

export const arrayToObject = curry((keyFn, array) =>
  reduce((obj, item) => {
    obj[keyFn(item)] = item //this is mutable due to performance
    return obj
  }, {})(array)
)

export const min = (a, b) => a.connections.length - b.connections.length
export const max = (a, b) => b.connections.length - a.connections.length
