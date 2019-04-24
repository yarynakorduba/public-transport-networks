import App from "./App"
import { Provider } from "react-redux"
import React from "react"

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
)
export default Root
