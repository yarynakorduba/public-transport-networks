export const arrayToObject = array =>
  array.reduce((obj, item) => {
    obj[item.id] = item
    return obj
  }, {})

export const min = (a, b) => a.connections.length - b.connections.length
export const max = (a, b) => b.connections.length - a.connections.length
