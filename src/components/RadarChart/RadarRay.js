import React from "react"
import { Line, Point } from "@vx/vx"
import BEM from "../../helpers/BEM"
const b = BEM("RadarChart")

const getAnchorDirection = x => (Math.abs(x) < 30 ? "middle" : x < 0 ? "end" : "start")

const RadarRay = ({ rayLabel, textRangeCoeff, targetPoint }) => (
  <g>
    <text
      textAnchor={getAnchorDirection(targetPoint.x)}
      className={b("text")}
      //TODO: write prettier formulas, separate the logic
      x={(targetPoint.x * 12) / 10 / 1.1}
      y={targetPoint.y > 0 ? (targetPoint.y * 12) / 10 : (targetPoint.y * 12) / 10 / 1.1}
    >
      {rayLabel}
    </text>
    <Line className={b("line-radial")} from={new Point({ x: 0, y: 0 })} to={targetPoint} />
  </g>
)

export default RadarRay
