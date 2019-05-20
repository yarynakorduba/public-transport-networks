// @flow
import { getStopsQuery } from "../api"
import { FETCH_STOPS_ERROR, FETCH_STOPS_START, FETCH_STOPS_SUCCESS} from "./actionTypes"
import {client} from '../components/Root'
export const fetchStopsStart = (city) => ({ type: FETCH_STOPS_START, city })
export const fetchStopsSuccess = (city, nodes) => ({ type: FETCH_STOPS_SUCCESS, city, nodes })
export const fetchStopsError = (city, error: string) => ({ type: FETCH_STOPS_ERROR, city, error })


export const fetchStops = (city:string) => async (dispatch:function) => {
  dispatch(fetchStopsStart(city))
  try {
    const response = await client.query({query: getStopsQuery, variables: { city: city }})
    if (!response.error) {
      dispatch(fetchStopsSuccess(city, response.data.stops))
    } else {
      dispatch(fetchStopsError(response.error))
    }
  } catch (e) {
    dispatch(fetchStopsError(e))
  }
}
