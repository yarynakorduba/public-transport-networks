import { FETCH_STOPS_ERROR, FETCH_STOPS_START, FETCH_STOPS_SUCCESS } from "../actions/actionTypes"
import { arrayToObject, mapIndexed } from "../helpers"
import { prop, compose, assoc, flip } from "ramda"
import { combineReducers } from "redux"

const data = (state: object = null, action: object): object => {
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

const areFetching = (state: boolean = false, action: object): boolean => {
  switch (action.type) {
    case FETCH_STOPS_START:
      return true
    case FETCH_STOPS_SUCCESS:
    case FETCH_STOPS_ERROR:
      return false
    default:
      return state
  }
}

export default combineReducers({
  data,
  areFetching
})

export const areDataFetching = state => state.areFetching
export const getData = state => state.data
