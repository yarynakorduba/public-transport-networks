import React from "react"
import { storiesOf } from "@storybook/react"
import ArticleLayout from "./ArticleLayout"
import configureStore from "../../configureStore"
import { Provider } from "react-redux"

const Illustration = (
  <div style={{ background: "#999", height: "50vh", width: "50vw", margin: 0 }}>Beautiful illustration</div>
)
const Article = (
  <div style={{ background: "lightgrey", height: "100vh", width: "50vw", margin: 0 }}>Wondreful Article</div>
)
storiesOf("ArticleLayout", module).add("Simple usage", () => {
  return (
    <Provider store={configureStore()}>
      <ArticleLayout article={Article} illustration={Illustration} />
    </Provider>
  )
})

