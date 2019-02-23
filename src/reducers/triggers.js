import { ADD_TRIGGER, REMOVE_TRIGGER } from "../actions/actionTypes"
import { omit } from "ramda"

const triggers = (state = {}, action) => {
  switch (action.type) {
    case ADD_TRIGGER:
      return { ...state, ...action.trigger }
    case REMOVE_TRIGGER:
      return action.trigger ? omit(Object.keys(action.trigger), state) : state
    default:
      return state
  }
}

export default triggers

export const getTriggers = state => state
