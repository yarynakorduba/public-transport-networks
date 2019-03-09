import progress, * as fromTriggers from "./progress"
import data, * as fromData from "./data"

import { combineReducers } from "redux"
import graph from "./graph"
import { SET_SCROLL } from "../actions/actionTypes"

const scrolled = (state = null, action) => {
  switch (action.type) {
    case SET_SCROLL:
      return action.scrolled
    default:
      return state
  }
}

const articleApp = combineReducers({
  data,
  triggers: progress,
  graph,
  scrolled
})

export default articleApp

export const areRoutesFetching = state => fromData.areRoutesFetching(state.data)
export const getRoutes = state => fromData.getRoutes(state.data)

export const getTriggers = state => fromTriggers.getTriggers(state.triggers)
export const isTriggerActive = (state, trigger) => fromTriggers.isTriggerActive(state.triggers, trigger)
