import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import articleApp from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => {
  const middlewares = [thunk]
  return createStore(articleApp, composeEnhancers(applyMiddleware(...middlewares)))
}

export default configureStore
