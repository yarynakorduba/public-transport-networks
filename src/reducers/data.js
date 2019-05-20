// @flow
import { FETCH_STOPS_ERROR, FETCH_STOPS_START, FETCH_STOPS_SUCCESS } from "../actions/actionTypes"
import { prop, compose } from "ramda"
import { combineReducers } from "redux"

const data = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STOPS_SUCCESS:
      return { ...state, [action.city]: compose(prop("nodes"))(action) }
    case FETCH_STOPS_ERROR:
    default:
      return state
  }
}

const areFetching = (state: boolean = {}, action: object): boolean => {
  switch (action.type) {
    case FETCH_STOPS_START:
      return { ...state, [action.city]: true }
    case FETCH_STOPS_SUCCESS:
    case FETCH_STOPS_ERROR:
      return { ...state, [action.city]: false }
    default:
      return state
  }
}

export default combineReducers({
  data,
  areFetching
})

export const areDataFetching = (state, city) => state.areFetching[city]
export const getData = (state, city) => state.data[city]
