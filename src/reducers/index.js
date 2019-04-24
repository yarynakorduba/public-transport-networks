// @flow
import { combineReducers } from "redux"
import data, * as fromData from "./data"

const articleApp = combineReducers({
  data
})

export default articleApp

export const getData = state => fromData.getData(state.data)
export const areDataFetching = state => fromData.areDataFetching(state.data)
