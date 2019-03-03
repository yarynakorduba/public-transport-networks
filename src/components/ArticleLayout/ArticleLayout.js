import React, { createContext } from "react"
import { compose } from "ramda"
import "./ArticleLayout.scss"
import { connect } from "react-redux"
import { triggerRespondent } from "../HOC/triggerRespondent"
import { withRouter } from "react-router-dom"
import { lifecycle, withState } from "recompose"
import { addTrigger, removeTrigger } from "../../actions/actionCreators"
import { withStateHandlers } from "recompose"

export const ScrolledContext = createContext()

const ArticleLayout = ({ article, illustration, addTrigger, removeTrigger, triggers, scrolled, onRef }) => (
  <section className={"ArticleLayout"} ref={onRef}>
    <ScrolledContext.Provider
      value={{
        scrolled,
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

const enhancer = compose(
  withRouter,
  connect(
    state => ({
      triggers: state.triggers
    }),
    { addTrigger, removeTrigger }
  ),
  withState("scrolled", "setScrolled", 0),
  withStateHandlers(() => ({ myScroll: null }), { onRef: () => ref => ({ myScroll: ref }) }),
  lifecycle({
    componentDidMount() {
      window.addEventListener("scroll", () => {
        this.props.setScrolled(-this.props.myScroll.getBoundingClientRect().top)
      })
    }
  }),
  triggerRespondent,
)

export default enhancer(ArticleLayout)
