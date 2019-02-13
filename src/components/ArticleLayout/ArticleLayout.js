import React, { Component, createContext } from "react"
import { dissoc, omit, without } from "ramda"

const ScrolledContext = createContext()

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
      <section ref="root">
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

          <div>{article}</div>
          <div>{illustration}</div>
        </ScrolledContext.Provider>
      </section>
    )
  }
}

export class Trigger extends Component {
  state = {
    position: null,
    triggered: false
  }

  componentDidMount() {
    this.setState({ position: this.refs.root.getBoundingClientRect().top })
  }

  render() {
    let { children } = this.props
    let { position, triggered } = this.state

    return (
      <span ref="root">
        <ScrolledContext.Consumer>
          {({ scrolled, onAction, offAction }) => {
            if (position - scrolled < 0 && !triggered) {
              this.setState({ triggered: true })
              onAction(this.props.data)
            }

            if (position - scrolled > 0 && triggered) {
              this.setState({ triggered: false })
              offAction(this.props.data)
            }
            return children
          }}
        </ScrolledContext.Consumer>
      </span>
    )
  }
}

export default ArticleLayout
