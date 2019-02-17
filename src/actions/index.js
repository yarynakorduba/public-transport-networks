import {
  ADD_TRIGGER,
  REMOVE_TRIGGER,
  FETCH_ROUTES_START,
  FETCH_ROUTES_SUCCESS,
  FETCH_ROUTES_ERROR
} from "./actionTypes"
import { json } from "d3"

export const addTrigger = trigger => dispatch => dispatch({ type: ADD_TRIGGER, trigger })
export const removeTrigger = trigger => dispatch => dispatch({ type: REMOVE_TRIGGER, trigger })

export const fetchRoutesStart = () => ({ type: FETCH_ROUTES_START })
export const fetchRoutesSuccess = routes => ({ type: FETCH_ROUTES_SUCCESS, routes })
export const fetchRoutesError = error => ({ type: FETCH_ROUTES_ERROR, error })

export const fetchRoutes = () => async dispatch => {
  dispatch(fetchRoutesStart())

  try {
    const response = await json("bristol_BUS.json", data => data)
    if (!response.error) {
      dispatch(fetchRoutesSuccess(response))
    } else {
      dispatch(fetchRoutesError(response.error))    }
  } catch (e) {
    fetchRoutesError(e)
  }
}
