import React, { Component, createContext } from "react"

const TriggerContext = createContext(100)

class ArticleLayout extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = { triggerOffset: 100 }
  render() {
    const { article, illustration, triggerOffset } = this.props
    return (
      <TriggerContext.Provider value={triggerOffset}>
        <div>{article}</div>
        <div>{illustration}</div>
      </TriggerContext.Provider>
    )
  }
}

export const Trigger = ({ children }) => (
  <TriggerContext.Consumer>
    {value => console.log("===> ", value) || children}
  </TriggerContext.Consumer>
)

export default ArticleLayout
