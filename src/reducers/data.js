import { FETCH_DATA_ERROR, FETCH_DATA_START, FETCH_DATA_SUCCESS } from "../actions/actionTypes"
import { combineReducers } from "redux"

const routes = (state = null, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return action.routes
    case FETCH_DATA_ERROR:
      return state
    default:
      return state
  }
}

const areFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_DATA_START:
      return true
    case FETCH_DATA_SUCCESS:
    case FETCH_DATA_ERROR:
      return false
    default:
      return state
  }
}

export default combineReducers({
  routes,
  areFetching
})

export const areRoutesFetching = state => state.areFetching
export const getRoutes = state => state.routes
