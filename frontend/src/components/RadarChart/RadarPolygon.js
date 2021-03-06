import React from "react"
import { withProps } from "recompose"
import { reduce } from "ramda"
import BEM from "../../helpers/BEM"
const b = BEM("RadarChart")

export const RadarPolygon = ({ polygonPoints, color = "gray" }) => (
  <polygon fill={color} stroke={color} points={polygonPoints} className={b("polygon")} />
)

export default withProps(({ polygonPointsList }) => ({
  polygonPoints: reduce((acc, { x, y }) => (x && y ? acc + `${x},${y} ` : acc), "", polygonPointsList)
}))(RadarPolygon)
