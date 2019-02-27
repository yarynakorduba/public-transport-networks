import triggers, * as fromTriggers from "./triggers"
import data, * as fromData from "./data"

import { combineReducers } from "redux"
import graph from "./graph"

const articleApp = combineReducers({
  data,
  triggers,
  graph
})

export default articleApp

export const areRoutesFetching = state => fromData.areRoutesFetching(state.data)
export const getRoutes = state => fromData.getRoutes(state.data)

export const getTriggers = state => fromTriggers.getTriggers(state.triggers)
