import { FETCH_STOPS_ERROR, FETCH_STOPS_SUCCESS, REMOVE_DEGREE_TWO_NODE } from "../actions/actionTypes"
import { arrayToObject } from "../helpers"
import { filter } from "ramda"

const graph = (state = null, action) => {
  switch (action.type) {
    case FETCH_STOPS_SUCCESS:
      console.log(action)
      return arrayToObject(action.nodes)
    case REMOVE_DEGREE_TWO_NODE:
      const [first, second] = state[action.id].connections
      const connections = {
        [first]: {
          ...state[first],
          connections: [...filter(n => n !== action.id, state[first].connections), second]
        },
        [second]: {
          ...state[second],
          connections: [...filter(n => n !== action.id, state[second].connections), first]
        }
      }
      delete state[action.id]
      return { ...state, ...connections }
    case FETCH_STOPS_ERROR:
    default:
      return state
  }
}

export default graph
