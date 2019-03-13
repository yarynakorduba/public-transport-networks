import progress, * as fromTriggers from "./progress"
import { combineReducers } from "redux"
import data, * as fromData from "./data"
import { SET_SCROLL } from "../actions/actionTypes"

const scrolled = (state:number = null, action:object):number => {
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

export const getTriggers = (state:object):object => fromTriggers.getTriggers(state.triggers)
export const isTriggerActive = (state:object, trigger:object):object => fromTriggers.isTriggerActive(state.triggers, trigger)

export const getData = (state:object):object => fromData.getData(state.data)
export const areDataFetching = (state:object):object => fromData.areDataFetching(state.data)
