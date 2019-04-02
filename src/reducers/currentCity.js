import { SWITCH_CITY } from "../actions/actionTypes"

const currentCity = (state=0, action) => {
  switch (action.type){
    case SWITCH_CITY:
      return action.city
    default:
      return state
  }
}

export default currentCity