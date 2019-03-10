import progress, * as fromTriggers from "./progress"
import { combineReducers } from "redux"
import data, * as fromData from "./data"
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
  triggers: progress,
  data,
  scrolled
})

export default articleApp

export const getTriggers = state => fromTriggers.getTriggers(state.triggers)
export const isTriggerActive = (state, trigger) => fromTriggers.isTriggerActive(state.triggers, trigger)

export const getData = state => fromData.getData(state.data)
export const areDataFetching = state => fromData.areDataFetching(state.data)
