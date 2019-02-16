import { ADD_TRIGGER, REMOVE_TRIGGER } from "../actions/actionTypes"
import { filter } from "ramda"

const triggers = (state = [], action) => {
  switch (action.type) {
    case ADD_TRIGGER:
      return [...state, action.trigger]
    case REMOVE_TRIGGER:
      return filter(n => n !== action.trigger, state)
    default:
      return state
  }
}

export default triggers
