import triggers, * as fromTriggers from "./triggers"
import data, * as fromData from "./data"

import { combineReducers } from "redux"

const articleApp = combineReducers({
  data,
  triggers
})

export default articleApp

export const areRoutesFetching = state => fromData.areRoutesFetching(state.data)
export const getRoutes = state => fromData.getRoutes(state.data)

export const getTriggers = state => fromTriggers.getTriggers(state.triggers)
