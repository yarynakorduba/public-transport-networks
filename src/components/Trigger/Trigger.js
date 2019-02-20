import React, { Component } from "react"
import { ScrolledContext } from "../ArticleLayout/ArticleLayout"

class Trigger extends Component {
  state = {
    position: null,
    triggered: false
  }
  toggleTrigger(triggered, toggleAction) {
    this.setState({ triggered })

    toggleAction(this.props.data)
  }

  componentDidMount() {
    this.setState({ position: this.refs.root.getBoundingClientRect().top })
  }

  componentDidUpdate() {
    if (this.state.position - this.context.scrolled < 0 && !this.state.triggered)
      this.toggleTrigger(true, this.context.onAction)

    if (this.state.position - this.context.scrolled > 0 && this.state.triggered)
      this.toggleTrigger(false, this.context.offAction)

    return this.props.children
  }

  render() {
    return <span ref="root" >{this.props.children}</span>
  }
}
Trigger.contextType = ScrolledContext
export default Trigger
