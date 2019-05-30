import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import configureStore from "./configureStore"
import initRecompose from "./configRecomposeStream.js"
import Root from "./components/Root"

it("renders without crashing", () => {

  initRecompose()
  const store = configureStore()
  const div = document.createElement("div")

  ReactDOM.render(<Root store={store} />, div)
  ReactDOM.unmountComponentAtNode(div)

  serviceWorker.unregister()
})

