import React from "react"
import { storiesOf } from "@storybook/react"
import { Illustration } from "./Illustration"
import configureStore from "../../configureStore"
import { Provider } from "react-redux"

storiesOf("Illustration", module).add("Simple usage", () => {
  return (
    <Provider store={configureStore()}>
      <Illustration />
    </Provider>
  )
})
