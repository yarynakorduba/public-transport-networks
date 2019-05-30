// @flow
import { combineReducers } from "redux"
import data, * as fromData from "./data"

const articleApp = combineReducers({
  data
})

export default articleApp

export const getStops = (state, city) => fromData.getStops(state.data, city)
export const areStopsFetching = (state, city) => fromData.areStopsFetching(state.data, city)

export const getStationTypes = (state, city) => fromData.getStationTypes(state.data, city)
export const areStationTypesFetching = (state, city) => fromData.areStationTypesFetching(state.data, city)
