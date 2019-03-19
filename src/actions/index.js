// @flow
import { getGraphSpaceData } from "../api"
import { FETCH_STOPS_ERROR, FETCH_STOPS_START, FETCH_STOPS_SUCCESS } from "./actionTypes"

export const fetchStopsStart = () => ({ type: FETCH_STOPS_START })
export const fetchStopsSuccess = nodes => ({ type: FETCH_STOPS_SUCCESS, nodes })
export const fetchStopsError = (error: string) => ({ type: FETCH_STOPS_ERROR, error })


export const fetchStops = (city:string, space:string) => async (dispatch:function) => {
  dispatch(fetchStopsStart())
  try {
    const response = await getGraphSpaceData(city, space)
    if (!response.error) {
      dispatch(fetchStopsSuccess(response))
    } else {
      dispatch(fetchStopsError(response.error))
    }
  } catch (e) {
    dispatch(fetchStopsError(e))
  }
}