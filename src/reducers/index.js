import triggers from "./triggers"
import data from "./data"

import { combineReducers } from "redux"

const articleApp = combineReducers({
  triggers,
  data
})

export default articleApp
