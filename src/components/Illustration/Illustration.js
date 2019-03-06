import React from "react"
import "./Illustration.scss"
import { Route, Switch, withRouter } from "react-router-dom"
import GraphTabsContainer from "../LPCGraph/GraphTabsContainer"
import SpacesExampleGraph from "../SpaceGraphs/SpacesExampleGraph"
import CSpaceGraph from "../SpaceGraphs/CSpaceGraph"
import LSpaceGraph from "../SpaceGraphs/LSpaceGraph"

const Illustration = () => (
  <div className={"Illustration"}>
    <Switch>
      {/*<SpacesExampleGraph />*/}
      <CSpaceGraph />
      {/*<Route exact path={"/"} component={LSpaceGraph} />*/}
      {/*<Route exact path={"/cities/:cityill/spaces/:space"} component={GraphTabsContainer} />*/}
    </Switch>
  </div>
)
export default withRouter(Illustration)
