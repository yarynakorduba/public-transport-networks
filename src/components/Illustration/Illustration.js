import React from "react"
import "./Illustration.scss"
import { Route, Switch, withRouter } from "react-router-dom"
import GraphTabsContainer from "../LPCGraph/GraphTabsContainer"
import LSpaceGraph from "../LSpaceGraph/LSpaceGraph"

const Illustration = () => (
  <div className={"Illustration"}>
    <Switch>
      {/*<LSpaceGraph />*/}
      {/*<Route exact path={"/"} component={LSpaceGraph} />*/}
      {/*<Route exact path={"/cities/:cityill/spaces/:space"} component={GraphTabsContainer} />*/}
    </Switch>
  </div>
)
export default withRouter(Illustration)
