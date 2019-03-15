import React, { useContext, useEffect, useState } from "react"
import "./Illustration.scss"
import SpaceGraph from "../SpaceGraph/SpaceGraph"
import DistributionViz from "../DistributionViz/DistributionViz"
import BEM from "../../helpers/BEM"

import { ScrolledContext } from "../Trigger/Trigger"

const b = BEM("Illustration")

export const Illustration = () => {
  const { scrolledProgress } = useContext(ScrolledContext)
  const [IllustrationToDisplay, setIllustrationToDisplay] = useState()
  useEffect(() => {
    if (scrolledProgress.representationOf && scrolledProgress.space) {
      setIllustrationToDisplay(<SpaceGraph {...scrolledProgress} />)
    } else {
      setIllustrationToDisplay("...Scroll through the article and watch the visualizations here...")
    }
  })
  return <div className={b()}>{IllustrationToDisplay}</div>
}

export default Illustration
