import React from "react"
import { withProps } from "recompose"
import { reduce } from "ramda"
import BEM from "../../helpers/BEM"
const b = BEM("RadarViz")

const RadarPolygon = ({ polygonPoints }) => <polygon points={polygonPoints} className={b("polygon")} />

const enhancer = withProps(({ polygonPointsList }) => ({
  polygonPoints: reduce((acc, { x, y }) => (x && y ? acc + `${x},${y} ` : acc), "", polygonPointsList)
}))

export default enhancer(RadarPolygon)
