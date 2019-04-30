import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import configureStore from "./configureStore"
import initRecompose from "./configRecomposeStream.js"
import Root from "./components/Root"

import "./styles/index.scss"

initRecompose()
const store = configureStore()

ReactDOM.render(<Root store={store} />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
