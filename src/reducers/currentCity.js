import { SWITCH_CITY } from "../actions/actionTypes"

const currentCity = (state=[{"city": 0, active: 1},{"city": 1, active: 0}, {"city": 2, active: 0}], action) => {
  switch (action.type){
    case SWITCH_CITY:
      return state.map((item,i)=>{
        if(i==action.cityId){
          item.active = action.cityActive
        }
        return item
      })
    default:
      return state
  }
}

export default currentCity