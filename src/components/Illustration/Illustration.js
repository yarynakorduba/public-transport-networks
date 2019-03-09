import React from "react"
import "./Illustration.scss"
import { withRouter } from "react-router-dom"
import LSpaceGraph from "../SpaceGraphs/LSpaceGraph"

const Illustration = () => (
  <div className={"Illustration"}>
    <LSpaceGraph classNameOfVisualizationContainer={".LSpaceGraph"}/>
  </div>
)
export default withRouter(Illustration)
