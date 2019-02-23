import { forceSimulation } from "d3"
import React from "react"
import { getBristolLSpaceGraph } from "../../api"

const LSpaceGraph = () => {
  const data = getBristolLSpaceGraph()
  console.log("===> ", data)
  return <div />
}

export default LSpaceGraph
