import React, { Component } from "react"
import { ScrolledContext } from "../ArticleLayout/ArticleLayout"
import "./Trigger.scss"
import compose from "ramda/es/compose"
import { fromRenderProps, lifecycle, withHandlers, withState } from "recompose"

const Trigger = ({setRoot,children}) => (<span className={"Trigger_highlighted"} ref={setRoot}>{children}</span>)
Trigger.contextType = ScrolledContext
const enhancer = compose(
  fromRenderProps(ScrolledContext.Consumer, ({scrolled,onAction,offAction})=>({scrolled,onAction,offAction})),
  withState("position", "changePosition", 0),
  withState("root", "setRoot", null),
  withState("triggered", "changeTrigger", false),
  withHandlers({
    toggleTrigger: ({changeTrigger, data}) => (triggered, toggleAction) => {
      changeTrigger(triggered)
      toggleAction(data)
    }
  }),
  lifecycle({
    componentDidMount(){
      window.addEventListener("scroll", () => this.props.changePosition(this.props.root.getBoundingClientRect().top))
    },
    componentDidUpdate(){
      if (this.props.position - this.props.scrolled < 0 && !this.props.triggered) {
        this.props.toggleTrigger(true, this.props.onAction)
      }
      if (this.props.position - this.props.scrolled > 0 && this.props.triggered)
        this.props.toggleTrigger(false, this.props.offAction)

      return this.props.children
    }
  })
)
export default enhancer(Trigger)