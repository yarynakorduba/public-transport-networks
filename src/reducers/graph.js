import { FETCH_STOPS_ERROR, FETCH_STOPS_SUCCESS } from "../actions/actionTypes"
import { arrayToObject, mapIndexed } from "../helpers"
import { filter, prop, compose, assoc, flip } from "ramda"

const graph = (state = null, action) => {
  switch (action.type) {
    case FETCH_STOPS_SUCCESS:
      return compose(
        arrayToObject(prop("id")),
        mapIndexed(flip(assoc("index"))),
        prop("nodes")
      )(action)
    case FETCH_STOPS_ERROR:
    default:
      return state
  }
}

export default graph
