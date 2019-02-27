import { FETCH_NODES_ERROR, FETCH_NODES_SUCCESS } from "../actions/actionTypes"
import { arrayToObject } from "../helpers"

const graph = (state = null, action) => {
  switch (action.type) {
    case FETCH_NODES_SUCCESS:
      return arrayToObject(action.nodes)
    case FETCH_NODES_ERROR:
    default:
      return state
  }
}

export default graph
