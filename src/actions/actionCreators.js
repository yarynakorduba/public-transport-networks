import {
  ADD_TRIGGER,
  FETCH_NODES_ERROR,
  FETCH_NODES_START,
  FETCH_NODES_SUCCESS,
  FETCH_ROUTES_ERROR,
  FETCH_ROUTES_START,
  FETCH_ROUTES_SUCCESS,
  REMOVE_DEGREE_TWO_NODE,
  REMOVE_TRIGGER
} from "./actionTypes"

export const removeDegreeTwoNode = id => ({ type: REMOVE_DEGREE_TWO_NODE, id })

export const addTrigger = trigger => dispatch => dispatch({ type: ADD_TRIGGER, trigger })
export const removeTrigger = trigger => dispatch => dispatch({ type: REMOVE_TRIGGER, trigger })

export const fetchRoutesStart = () => ({ type: FETCH_ROUTES_START })
export const fetchRoutesSuccess = routes => ({ type: FETCH_ROUTES_SUCCESS, routes })
export const fetchRoutesError = error => ({ type: FETCH_ROUTES_ERROR, error })

export const fetchNodesStart = () => ({ type: FETCH_NODES_START })
export const fetchNodesSuccess = nodes => ({ type: FETCH_NODES_SUCCESS, nodes })
export const fetchNodesError = error => ({ type: FETCH_NODES_ERROR, error })
