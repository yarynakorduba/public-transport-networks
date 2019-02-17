import triggers from "./triggers"
import data from "./data"

import { combineReducers } from "redux"

const articleApp = combineReducers({
  data,
  triggers
})

export default articleApp
