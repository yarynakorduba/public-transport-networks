import React from "react"
import { compose, withProps } from "recompose"
import GraphTabs from "./Tabs"
import bristolLSpace from "../../images/bristolLSpace.png"
import bristolCSpace from "../../images/bristolCSpace.png"
import bristolPSpace from "../../images/bristolPSpace.png"
import { BrowserRouter, withRouter } from "react-router-dom"
import "./GraphTabsContainer.scss"

let GraphTabsContainer = ({ showPicture, width, height, displayProps, graphComponent = "", imgComponent }) => (
  <div className={"GraphTabsContainer"}>
    <GraphTabs />
    <div className={"GraphTabsContainer__info"}>
      <h3 className={"GraphTabsContainer__header"}>{graphComponent}</h3>
      <img className={"GraphTabsContainer__image"} alt="tabImage" src={imgComponent} />
    </div>
  </div>
)

const enhancer = compose(
  withRouter,
  withProps(({ ...props }) =>
    props.location.pathname === "/l-space"
      ? { graphComponent: "L-space", imgComponent: bristolLSpace }
      : props.location.pathname === "/p-space"
      ? { graphComponent: "P-space", imgComponent: bristolPSpace }
      : { graphComponent: "C-space", imgComponent: bristolCSpace }
  )
)

GraphTabsContainer = enhancer(GraphTabsContainer)

const WrappedContainer = () => (
  <BrowserRouter>
    <GraphTabsContainer />
  </BrowserRouter>
)

export default WrappedContainer
