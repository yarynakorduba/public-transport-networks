import React, { Component } from "react"
import "../styles/App.scss"
import ArticleLayout from "./ArticleLayout"
import Article from "./Article"
import { BrowserRouter } from "react-router-dom"
import Illustration from "./Illustration/Illustration"

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <ArticleLayout article={<Article />} illustration={<Illustration />} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
