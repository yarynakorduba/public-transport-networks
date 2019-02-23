import { FETCH_ROUTES_ERROR, FETCH_ROUTES_START, FETCH_ROUTES_SUCCESS } from "../actions/actionTypes"
import { combineReducers } from "redux"

const routes = (state = null, action) => {
  switch (action.type) {
    case FETCH_ROUTES_SUCCESS:
      return action.routes
    case FETCH_ROUTES_ERROR:
      return state
    default:
      return state
  }
}

const areFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_ROUTES_START:
      return true
    case FETCH_ROUTES_SUCCESS:
    case FETCH_ROUTES_ERROR:
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
