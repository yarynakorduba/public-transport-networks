import { json } from "d3"
import { getLSpaceGraphNodes } from "../api"
import {
  fetchNodesError,
  fetchNodesStart,
  fetchNodesSuccess, fetchRoutesError,
  fetchRoutesStart,
  fetchRoutesSuccess
} from "./actionCreators"


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
