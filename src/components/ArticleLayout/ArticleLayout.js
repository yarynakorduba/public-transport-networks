import React, { Component, createContext } from "react"
import "./ArticleLayout.scss"
import { connect } from "react-redux"
import { addTrigger, removeTrigger } from "../../actions"

export const ScrolledContext = createContext()

class ArticleLayout extends Component {
  state = {
    scrolled: 0
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      this.setState({
        scrolled: this.refs.root.getBoundingClientRect().top
      })
    })
  }

  render() {
    const { article, illustration, addTrigger, removeTrigger, triggers } = this.props
    const { scrolled } = this.state
    return (
      <section className={"ArticleLayout"} ref="root">
        <ScrolledContext.Provider
          value={{
            scrolled: -scrolled,
            onAction: data => {
              addTrigger(data)
            },
            offAction: data => {
              removeTrigger(data)
            }
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
            {JSON.stringify(triggers)}
          </div>

          <div className={"ArticleLayout__article"}>{article}</div>
          <div className={"ArticleLayout__illustration"}>{illustration}</div>
        </ScrolledContext.Provider>
      </section>
    )
  }
}

const enhancer = connect(
  state => ({
    triggers: state.triggers
  }),
  { addTrigger, removeTrigger }
)

export default enhancer(ArticleLayout)
