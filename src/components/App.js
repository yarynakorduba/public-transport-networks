import React, { Component } from "react"
import "../styles/App.scss"
import ArticleLayout from "./ArticleLayout"
import Article from "./Article"
import LPCGraph from "./LPCGraph"

class App extends Component {
  render() {
    return (
      <div className="App">
        <ArticleLayout article={<Article />} illustration={<LPCGraph />} />
      </div>
    )
  }
}

export default App
