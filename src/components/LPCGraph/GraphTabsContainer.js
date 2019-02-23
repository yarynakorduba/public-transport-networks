import React from "react"
import { compose, withProps } from "recompose"
import GraphTabs from "./Tabs"
import bristolLSpace from "../../images/bristoll-space.png"
import bristolCSpace from "../../images/bristolc-space.png"
import bristolPSpace from "../../images/bristolp-space.png"
import londonCSpace from "../../images/londonc-space.png"
import londonLSpace from "../../images/londonl-space.png"
import { withRouter } from "react-router-dom"
import "./GraphTabsContainer.scss"

const illustrationsByName = {
  bristolLSpace,
  bristolPSpace,
  bristolCSpace,
  londonCSpace,
  londonLSpace
}

let GraphTabsContainer = ({ city, tabsHeader = "", imgComponent }) => (
  <div className={"GraphTabsContainer"}>
    <h3 className={"GraphTabsContainer__header"}>{tabsHeader}</h3>
    <GraphTabs city={city} />
    <div className={"GraphTabsContainer__info"}>
      <img className={"GraphTabsContainer__image"} alt="tabImage" src={imgComponent} />
    </div>
  </div>
)

const enhancer = compose(
  withRouter,
  withProps(({ match: { params } }) => ({
    tabsHeader: params.city.toUpperCase(),
    city: params.city,
    imgComponent: illustrationsByName[`${params.city}${params.space.toUpperCase()}Space`]
  }))
)

export default enhancer(GraphTabsContainer)
