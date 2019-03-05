import {
  ADD_TRIGGER,
  FETCH_STOPS_ERROR,
  FETCH_STOPS_START,
  FETCH_STOPS_SUCCESS,
  FETCH_DATA_ERROR,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  REMOVE_DEGREE_TWO_NODE,
  REMOVE_TRIGGER
} from "./actionTypes"

export const removeDegreeTwoNode = id => ({ type: REMOVE_DEGREE_TWO_NODE, id })

export const addTrigger = trigger => dispatch => dispatch({ type: ADD_TRIGGER, trigger })
export const removeTrigger = trigger => dispatch => dispatch({ type: REMOVE_TRIGGER, trigger })

export const fetchDataStart = () => ({ type: FETCH_DATA_START })
export const fetchDataSuccess = routes => ({ type: FETCH_DATA_SUCCESS, routes })
export const fetchDataError = error => ({ type: FETCH_DATA_ERROR, error })

export const fetchStopsStart = () => ({ type: FETCH_STOPS_START })
export const fetchStopsSuccess = nodes => ({ type: FETCH_STOPS_SUCCESS, nodes })
export const fetchStopsError = error => ({ type: FETCH_STOPS_ERROR, error })
