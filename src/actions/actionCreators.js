import {
  ADD_TRIGGER,
  FETCH_STOPS_ERROR,
  FETCH_STOPS_START,
  FETCH_STOPS_SUCCESS,
  FETCH_DATA_ERROR,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  REMOVE_TRIGGER,
  SET_SCROLL
} from "./actionTypes"

export const setScroll = (scrolled:object):object => ({ scroll: SET_SCROLL, scrolled })

export const addTrigger = (trigger:object):object => (dispatch:function) => dispatch({ type: ADD_TRIGGER, trigger })
export const removeTrigger = (trigger:object):object => (dispatch:function) => dispatch({ type: REMOVE_TRIGGER, trigger })

export const fetchDataStart = () => ({ type: FETCH_DATA_START })
export const fetchDataSuccess = (routes:object):object => ({ type: FETCH_DATA_SUCCESS, routes })
export const fetchDataError = (error:string):object => ({ type: FETCH_DATA_ERROR, error })

export const fetchStopsStart = () => ({ type: FETCH_STOPS_START })
export const fetchStopsSuccess = (nodes:object):object => ({ type: FETCH_STOPS_SUCCESS, nodes })
export const fetchStopsError = (error:string):object => ({ type: FETCH_STOPS_ERROR, error })
