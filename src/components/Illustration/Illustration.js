import React from "react"
import "./Illustration.scss"
import { Route, Switch, withRouter } from "react-router-dom"
import GraphTabsContainer from "../LPCGraph/GraphTabsContainer"

const EmptyState = () => <div />

const Illustration = () => (
  <div className={"Illustration"}>
    <Switch>
      <Route exact path={"/"} component={EmptyState} />
      <Route exact path={"/cities/:city/spaces/:space"} component={GraphTabsContainer} />
    </Switch>
  </div>
)
export default withRouter(Illustration)
