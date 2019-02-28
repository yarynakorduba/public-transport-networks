import {
  ADD_TRIGGER,
  REMOVE_TRIGGER,
  FETCH_ROUTES_START,
  FETCH_ROUTES_SUCCESS,
  FETCH_ROUTES_ERROR,
  FETCH_NODES_START,
  FETCH_NODES_SUCCESS,
  FETCH_NODES_ERROR,
  REMOVE_DEGREE_TWO_NODE
} from "./actionTypes"
import { json } from "d3"
import { getLSpaceGraphNodes } from "../api"

export const fetchNodesStart = () => ({ type: FETCH_NODES_START })
export const fetchNodesSuccess = nodes => ({ type: FETCH_NODES_SUCCESS, nodes })
export const fetchNodesError = error => ({ type: FETCH_NODES_ERROR, error })

export const fetchNodes = city => async dispatch => {
  dispatch(fetchNodesStart())
  try {
    const response = await getLSpaceGraphNodes(city)
    if (!response.error) {
      dispatch(fetchNodesSuccess(response))
    } else {
      dispatch(fetchNodesError(response.error))
    }
  } catch (e) {
    dispatch(fetchNodesError(e))
  }
}

export const removeDegreeTwoNode = id => ({ type: REMOVE_DEGREE_TWO_NODE, id })

export const addTrigger = trigger => dispatch => dispatch({ type: ADD_TRIGGER, trigger })
export const removeTrigger = trigger => dispatch => dispatch({ type: REMOVE_TRIGGER, trigger })

export const fetchRoutesStart = () => ({ type: FETCH_ROUTES_START })
export const fetchRoutesSuccess = routes => ({ type: FETCH_ROUTES_SUCCESS, routes })
export const fetchRoutesError = error => ({ type: FETCH_ROUTES_ERROR, error })

export const fetchRoutes = () => async dispatch => {
  dispatch(fetchRoutesStart())
  try {
    const response = await json("data/bristol_BUS.json", data => data)
    if (!response.error) {
      dispatch(fetchRoutesSuccess(response))
    } else {
      dispatch(fetchRoutesError(response.error))
    }
  } catch (e) {
    fetchRoutesError(e)
  }
}
