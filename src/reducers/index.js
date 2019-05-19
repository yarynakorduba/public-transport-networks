// @flow
import { combineReducers } from "redux"
import data, * as fromData from "./data"

const articleApp = combineReducers({
  data
})

export default articleApp

export const getData = (state, city) => fromData.getData(state.data, city)
export const areDataFetching = (state, city) => fromData.areDataFetching(state.data, city)
