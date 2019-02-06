import React, { Component } from "react"
import "../styles/App.scss"
import GraphContainer from "./GraphContainer"
import ArticleContainer from "./ArticleContainer"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className={"App__article-block"}>
          <ArticleContainer />
        </div>
        <div className={"App__graph-block"}>
          <GraphContainer />
        </div>
      </div>
    )
  }
}

export default App
