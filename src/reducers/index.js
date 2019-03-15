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
  data,
  scrolled
})

export default articleApp

export const getData = (state:object):object => fromData.getData(state.data)
export const areDataFetching = (state:object):object => fromData.areDataFetching(state.data)
