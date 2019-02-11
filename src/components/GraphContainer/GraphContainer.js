import React from "react"
import "./GraphContainer.scss"
import TransportGraph from "../TransportGraph"

const GraphContainer = () => <TransportGraph nodes={[
  { x: 50, y: 20 },
  { x: 200, y: 300 },
  { x: 300, y: 40 }
]} width={"300px"} height={"300px"}/>
export default GraphContainer
