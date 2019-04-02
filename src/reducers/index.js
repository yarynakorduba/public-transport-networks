// @flow
import { combineReducers } from "redux"
import data, * as fromData from "./data"
import currentCity from "./currentCity"

const articleApp = combineReducers({
  data,
  currentCity
})

export default articleApp

export const getData = state => fromData.getData(state.data)
export const areDataFetching = state => fromData.areDataFetching(state.data)
