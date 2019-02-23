import React from "react"
import { NavLink } from "react-router-dom"
import "./Tabs.scss"

const Tab = props => (
  <NavLink
    {...props}
    exact={props.exact}
    className="Tabs__tab"
    activeClassName="Tabs__tab_active"
    isActive={props.isActive}
  />
)

const Tabs = () => (
  <div>
    <Tab to={"/l-space"}>L-space</Tab>
    <Tab to={"/p-space"}>P-space</Tab>
    <Tab to={"/c-space"}>C-space</Tab>
  </div>
)

export default Tabs
