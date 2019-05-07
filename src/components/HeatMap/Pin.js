import React from "react"
import BEM from "../../helpers/BEM"
import "./Pin.scss"

const b = BEM("Pin")

const Pin = () => (
  <svg height={24} className={b()} viewBox="-24 -24 48 48">
    <circle className={b("symbol")} r={20} />
  </svg>
)

export default Pin
