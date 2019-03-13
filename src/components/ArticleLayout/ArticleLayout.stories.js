import React from "react"
import { storiesOf } from "@storybook/react"
import ArticleLayout from "./ArticleLayout"
import configureStore from "../../configureStore"
import { Provider } from "react-redux"


const Illustration = <div>Beautiful illustration</div>

storiesOf("ArticleLayout", module).add("Simple usage", () => {
  return (
    <Provider store={configureStore()}>
      <ArticleLayout article={"Wonderful Article"} illustration={Illustration} />
    </Provider>
  )
})
