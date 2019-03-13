import { ADD_TRIGGER, REMOVE_TRIGGER } from "../actions/actionTypes"
import { omit, eqProps, keys } from "ramda"

const progress = (state:object = {}, action:object):object => {
  switch (action.type) {
    case ADD_TRIGGER:
      return { ...state, ...action.trigger }
    case REMOVE_TRIGGER:
      return action.trigger ? omit(Object.keys(action.trigger), state) : state
    default:
      return state
  }
}

export default progress

export const isTriggerActive = (state:object, trigger:object):object => eqProps(...keys(trigger), trigger, state)
export const getTriggers = (state:object):object => state
