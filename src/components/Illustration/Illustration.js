import React from "react"
import "./Illustration.scss"
import SpaceGraph from "../SpaceGraph/SpaceGraph"

export const Illustration = () => (
  <div className={"Illustration"}>
    <SpaceGraph space={"l"} representationOf={"bristol"} classNameOfVisualizationContainer={"SpaceGraph"} />
  </div>
)
export default Illustration
