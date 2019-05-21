// @flow
import { getStationTypesQuery, getStopsQuery } from "../api"
import {
  FETCH_STATION_TYPES_ERROR,
  FETCH_STATION_TYPES_START,
  FETCH_STATION_TYPES_SUCCESS,
  FETCH_STOPS_ERROR,
  FETCH_STOPS_START,
  FETCH_STOPS_SUCCESS
} from "./actionTypes"
import {client} from '../components/Root'
export const fetchStopsStart = (city) => ({ type: FETCH_STOPS_START, city })
export const fetchStopsSuccess = (city, stops) => ({ type: FETCH_STOPS_SUCCESS, city, stops })
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

export const fetchStationTypesStart = (city) => ({ type: FETCH_STATION_TYPES_START, city })
export const fetchStationTypesSuccess = (city, stationTypes) => ({ type: FETCH_STATION_TYPES_SUCCESS, city, stationTypes })
export const fetchStationTypesError = (city, error: string) => ({ type: FETCH_STATION_TYPES_ERROR, city, error })

export const fetchStationTypes = (city:string) => async (dispatch:function) => {
  dispatch(fetchStationTypesStart(city))
  try {
    const response = await client.query({query: getStationTypesQuery, variables: { city: city }})
    if (!response.error) {
      dispatch(fetchStationTypesSuccess(city, response.data.stationTypes))
    } else {
      dispatch(fetchStationTypesError(response.error))
    }
  } catch (e) {
    dispatch(fetchStationTypesError(e))
  }
}
