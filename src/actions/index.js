import { json } from "d3"
import { getGraphSpaceData } from "../api"
import {
  fetchStopsError,
  fetchStopsStart,
  fetchStopsSuccess,
  fetchDataError,
  fetchDataStart,
  fetchDataSuccess
} from "./actionCreators"

export const fetchStops = (city, space) => async dispatch => {
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

export const fetchData = () => async dispatch => {
  dispatch(fetchDataStart())
  try {
    const response = await json("data/bristol_BUS.json", data => data)
    if (!response.error) {
      dispatch(fetchDataSuccess(response))
    } else {
      dispatch(fetchDataError(response.error))
    }
  } catch (e) {
    fetchDataError(e)
  }
}
