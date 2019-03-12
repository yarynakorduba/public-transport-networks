import React from "react"
import { ScrolledContext } from "../ArticleLayout/ArticleLayout"
import "./Trigger.scss"
import { fromRenderProps, lifecycle, withHandlers, withProps, withState, compose } from "recompose"
import { connect } from "react-redux"
import { addTrigger, removeTrigger } from "../../actions/actionCreators"
import { isTriggerActive } from "../../reducers"
import BEM from "../../helpers/BEM"

const b = BEM("Trigger")

export const Trigger = ({ setRoot, children, isActive }) => (
  <span className={isActive ? b(["highlighted"]) : b()} ref={setRoot}>
    {children}
  </span>
)

const enhancer = compose(
  connect(
    (state, ownProps) => ({
      isActive: isTriggerActive(state, ownProps.data)
    }),
    { addTrigger, removeTrigger }
  ),
  fromRenderProps(ScrolledContext.Consumer, ({ scrolled }) => ({ scrolled })),
  withState("root", "setRoot", null),
  withProps(
    ({ root }) =>
      root && {
        position: root && root.offsetTop
      }
  ),
  withHandlers({
    toggleTriggerIfNeeded: ({ position, data, scrolled, isActive, children, addTrigger, removeTrigger }) => () => {
      if (position - scrolled < 200 && position - scrolled > 0 && !isActive) {
        addTrigger(data)
      } else if (position - scrolled > 200 && isActive && data) {
        removeTrigger(data)
      }
      return children
    }
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener("scroll", this.props.toggleTriggerIfNeeded)
    },
    componentWillUnmount() {
      window.removeEventListener("scroll", this.props.toggleTriggerIfNeeded)
    }
  })
)
export default enhancer(Trigger)
