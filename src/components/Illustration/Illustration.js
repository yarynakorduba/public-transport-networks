import React from "react"
import "./Illustration.scss"
import { Route, Switch, withRouter } from "react-router-dom"
import GraphTabsContainer from "../LPCGraph/GraphTabsContainer"
import LSpaceGraph from "../SpaceGraphs/LSpaceGraph"
import SpacesExampleGraph from "../SpaceGraphs/SpacesExampleGraph"

export const Illustration = () => (
  <div className={"Illustration"}>
    Hello!
    {/*<SpacesExampleGraph />*/}
    {/*<LSpaceGraph />*/}
    {/*<Route exact path={"/"} component={LSpaceGraph} />*/}
    {/*<Route exact path={"/cities/:cityill/spaces/:space"} component={GraphTabsContainer} />*/}
  </div>
)
export default withRouter(() => (
  <Switch>
    <Illustration />
  </Switch>
))
