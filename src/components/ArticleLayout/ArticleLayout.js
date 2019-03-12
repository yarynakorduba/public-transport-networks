import React, { createContext } from "react"
import { compose } from "ramda"
import "./ArticleLayout.scss"
import { connect } from "react-redux"
import { lifecycle, withState } from "recompose"
import BEM from "../../helpers/BEM"

const b = BEM("ArticleLayout")

export const ScrolledContext = createContext()

const ArticleLayout = ({ article, illustration, addTrigger, removeTrigger, triggers, scrolled, setRoot }) => (
  <section className={b()} ref={setRoot}>
    <ScrolledContext.Provider
      value={{
        scrolled
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
      <div className={b("article")}>{article}</div>
      <div className={b("illustration")}>{illustration}</div>
    </ScrolledContext.Provider>
  </section>
)

const enhancer = compose(
  connect(state => ({
    triggers: state.triggers
  })),
  withState("scrolled", "setScrolled", 0),
  withState("root", "setRoot", null),
  lifecycle({
    componentDidMount() {
      window.addEventListener("scroll", () => this.props.setScrolled(-this.props.root.getBoundingClientRect().top))
    },
    componentWillUnmount() {
      window.removeEventListener("scroll", this.props.setScrolled)
    }
  })
)

export default enhancer(ArticleLayout)
