import React from "react"
import "./Illustration.scss"
import SpaceGraph from "../SpaceGraph/SpaceGraph"
import BEM from "../../helpers/BEM"

const b = BEM("Illustration")

export const Illustration = () => (
  <div className={b()}>
    <SpaceGraph space={"l"} representationOf={"bristol"} classNameOfVisualizationContainer={"SpaceGraph"} />
  </div>
)
export default Illustration
