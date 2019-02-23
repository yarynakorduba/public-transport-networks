import React from "react"
import { NavLink, withRouter } from "react-router-dom"
import "./Tabs.scss"

const Tab = props => (
  <NavLink {...props} exact={true} className="Tabs__tab" activeClassName="Tabs__tab_active" isActive={props.isActive} />
)

const Tabs = ({ city }) => (
  <div>
    <Tab to={`/cities/${city}/spaces/l`}>L-space</Tab>
    <Tab to={`/cities/${city}/spaces/p`}>P-space</Tab>
    <Tab to={`/cities/${city}/spaces/c`}>C-space</Tab>
  </div>
)

export default withRouter(Tabs)
