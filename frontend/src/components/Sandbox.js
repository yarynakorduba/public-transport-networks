export const tail = array => array.slice(1)
export const head = array => array[0]

/* if no accumulator is provided, takes the 0th value as accum
 *  and starts iterating from the 1st element
 *  else takes accum provided and starts from the 0th item
 * */
const customReduce = (callbackFn, initialValue = undefined, sourceArray) =>
  sourceArray.length
    ? customReduce(callbackFn, callbackFn(initialValue, head(sourceArray)), tail(sourceArray))
    : initialValue

const addNumbers = (a, b, c, d) => a + b + c + d
// const customCurry = fn => (...args) => {
//   console.log(args)
//   return args.length > 0
//     ? customCurry(() => fn(head(args), ...tail(args)))(...tail(args))
//     : customCurry(() => fn(head(args), ...tail(args)))
// }

const concat = (array, currentValue) => array.concat(currentValue)
const flatten = sourceArray =>
  sourceArray.find(element => Array.isArray(element)) ? flatten(customReduce(concat, [], sourceArray)) : sourceArray

console.log(flatten([1, 2, [3, 4, [5, 6], [6, 7]], [1, [[[[[[[[2]]]]]]]]]]))

// const customReduce = ( reducer, initialValue, sourceArray) => {
//   if (sourceArray.length) {
//     if (initialValue !== undefined) return initialValue
//     throw new TypeError("reduce of empty array with no initial value")
//   }
//   const [accumulatorToPass, arrayToPass] =
//     initialValue !== undefined ? [initialValue, sourceArray] : [head(sourceArray), tail(sourceArray)]
//   return tail(arrayToPass).length
//     ? customReduce(reducer, reducer(accumulatorToPass, head(arrayToPass)))
//     : head(arrayToPass)
//     ? reducer(accumulatorToPass, head(arrayToPass))
//     : accumulatorToPass
// }
/* CHECK */
export const array1 = [1, 2, 3]
export const mapper = obj => {
  return obj.value
}
export const reducer = (accumulator, currentValue) => accumulator + currentValue * 20
// console.log("!!!array ===> ", array1.reduce(reducer, 0))
// console.log("!!!my array => ", customReduce(reducer, 0, array1))

export const customMap = (sourceArray, mapper) =>
  customReduce(sourceArray, (accumulator, currentValue) => [...accumulator, mapper(currentValue)], [])

export const words = ["перший", "другий", "третій", "четвертий"]

// console.log("array ===> ", Array.prototype.map.call(array2, "1234"))
// console.log("my array => ", customMap(array2, "1234"))

export const isBigEnough = value => {
  if (typeof value === "number") {
    return value > 0 && Math.floor(value) === value
  }
  return false
}

export const isValid = item => {
  return isBigEnough(item.id)
}

export const customFilter = (sourceArray, filterFn) =>
  customReduce(
    sourceArray,
    (accumulator, currentValue) => (filterFn(currentValue) ? [...accumulator, currentValue] : accumulator),
    []
  )

// console.log(
//   "filter ===> ",
//   [1].filter(word => {
//     if (word === "другий") {
//       words.shift()
//     }
//     return true
//   })
// )
// console.log(
//   "my filter ===> ",
//   customFilter([1], word => {
//     if (word === "другий") {
//       words.shift()
//     }
//     return true
//   })
// )
