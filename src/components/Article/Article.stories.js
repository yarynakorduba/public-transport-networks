import React from "react"
import { storiesOf } from "@storybook/react"
import Article from "./Article"
import { Provider } from "react-redux"
import configureStore from "../../configureStore"
import { ScrolledContext } from "../ArticleLayout/ArticleLayout"

const store = configureStore()
const scrolled = 100
storiesOf("Article", module).add("Simple usage", () => {
  return (
    <Provider store={store}>
      <ScrolledContext.Provider
        value={{
          scrolled
        }}
      >
        <Article />
      </ScrolledContext.Provider>
    </Provider>
  )
})
