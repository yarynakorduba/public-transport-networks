// @flow
import {
  FETCH_STATION_TYPES_ERROR,
  FETCH_STATION_TYPES_START,
  FETCH_STATION_TYPES_SUCCESS,
  FETCH_STOPS_ERROR,
  FETCH_STOPS_START,
  FETCH_STOPS_SUCCESS
} from "../actions/actionTypes"
import { assocPath, pathOr, prop } from "ramda"
import { combineReducers } from "redux"

const data = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STOPS_SUCCESS:
      return assocPath([action.city, "stops"], prop("stops", action), state)
    case FETCH_STATION_TYPES_SUCCESS:
      return assocPath([action.city, "stationTypes"], prop("stationTypes", action), state)
    case FETCH_STOPS_ERROR:
    case FETCH_STATION_TYPES_ERROR:
    default:
      return state
  }
}

const areFetching = (state: boolean = {}, action: object): boolean => {
  switch (action.type) {
    case FETCH_STOPS_START:
      return assocPath([action.city, "stops"], true, state)
    case FETCH_STATION_TYPES_START:
      return assocPath([action.city, "stationTypes"], true, state)
    case FETCH_STOPS_SUCCESS:
    case FETCH_STOPS_ERROR:
      return assocPath([action.city, "stops"], false, state)
    case FETCH_STATION_TYPES_SUCCESS:
    case FETCH_STATION_TYPES_ERROR:
      return assocPath([action.city, "stationTypes"], false, state)
    default:
      return state
  }
}

export default combineReducers({
  data,
  areFetching
})

export const areStopsFetching = (state, city) => pathOr(undefined, ["areFetching", city, "stops"], state)
export const getStops = (state, city) => pathOr(undefined, ["data", city, "stops"], state)

export const areStationTypesFetching = (state, city) => pathOr(undefined, ["areFetching", city, "stationTypes"], state)
export const getStationTypes = (state, city) => pathOr(undefined, ["data", city, "stationTypes"], state)
