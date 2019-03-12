import React from "react"
import { storiesOf } from "@storybook/react"
import Article from "./Article"
import { Provider } from "react-redux"
import configureStore from "../../configureStore"

const store = configureStore()

storiesOf("Article", module).add("Simple usage", () => (
  <Provider store={store}>
    <Article />
  </Provider>
))
