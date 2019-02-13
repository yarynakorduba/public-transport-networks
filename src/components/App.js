import React, { Component } from "react"
import "../styles/App.scss"
import ArticleLayout from "./ArticleLayout"
import Article from "./Article"
import TransportGraph from "./TransportGraph"

class App extends Component {
  render() {
    return (
      <div className="App">
        <ArticleLayout article={<Article />} illustration={<TransportGraph />} />
      </div>
    )
  }
}

export default App
