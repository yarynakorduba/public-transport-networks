import React, { Component, createContext } from "react"
import { omit } from "ramda"
import "./ArticleLayout.scss"

export const ScrolledContext = createContext()

class ArticleLayout extends Component {
  state = {
    scrolled: 0,
    showState: []
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      this.setState({
        scrolled: this.refs.root.getBoundingClientRect().top
      })
    })
  }

  render() {
    const { article, illustration } = this.props
    const { scrolled, showState } = this.state

    return (
      <section className={"ArticleLayout"} ref="root">
        <ScrolledContext.Provider
          value={{
            scrolled: -scrolled,
            onAction: data =>
              this.setState({
                showState: {
                  ...showState,
                  ...data
                }
              }),
            offAction: data =>
              this.setState({
                showState: omit(Object.keys(data), showState)
              })
          }}
        >
          <div
            style={{
              color: "red",
              position: "fixed",
              top: 10,
              background: "white"
            }}
          >
            {JSON.stringify(showState)}
          </div>

          <div className={"ArticleLayout__article"}>{article}</div>
          <div className={"ArticleLayout__illustration"}>{illustration}</div>
        </ScrolledContext.Provider>
      </section>
    )
  }
}

export default ArticleLayout
