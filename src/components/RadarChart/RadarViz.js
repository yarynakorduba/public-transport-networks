import React from "react"
import { Group, scaleLinear } from "@vx/vx"
import { compose, defaultProps, withProps } from "recompose"
import { max } from "d3"
import data from "../../radar_testik"
import RadarRay from "./RadarRay"
import RadarPolygon from "./RadarPolygon"
import "./RadarViz.scss"
import BEM from "../../helpers/BEM"

const b = BEM("RadarViz")

const getStep = dataLength => (Math.PI * 2) / dataLength

const genPoints = (length, radius) =>
  [...Array(length)].map((_, i) => ({
    x: radius * Math.sin(i * getStep(length)),
    y: radius * Math.cos(i * getStep(length))
  }))

const genPolygonPoints = (length, scale, access) => {
  const step = getStep(data.length)
  const points = new Array(data.length + 1).fill({}).map((obj, i) =>
    i === 0
      ? {}
      : {
          x: scale(access(data[i - 1])) * Math.sin(i * step),
          y: scale(access(data[i - 1])) * Math.cos(i * step)
        }
  )
  return points
}

const RadarViz = ({ drawChart, width, height, radarPoints, polygonPoints }) => (
  <svg className={b()} width={width + 50} height={height}>
    {polygonPoints && (
      <Group top={height / 2} left={width / 2 + 25}>
        {radarPoints.map((point, i) => (
          <RadarRay rayLabel={data[i].property} targetPoint={point} key={i} />
        ))}
        <RadarPolygon polygonPointsList={polygonPoints} />
        {polygonPoints.map((point, i) => (
          <circle key={i} cx={point.x} cy={point.y} r={4} className={b("circle")} />
        ))}
      </Group>
    )}
  </svg>
)

export default compose(
  defaultProps({
    width: 250,
    height: 250,
    margin: {
      top: 40,
      left: 80,
      right: 80,
      bottom: 80
    }
  }),
  withProps(({ width, height, margin }) => ({
    radius: Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) / 1.3
  })),
  withProps(({ radius }) => ({
    yScale: scaleLinear({
      range: [0, radius],
      domain: [0, max(data, d => d.frequency)]
    })
  })),
  withProps(({ radius, yScale }) => ({
    radarPoints: genPoints(data.length, radius),
    polygonPoints: genPolygonPoints(data, yScale, d => d.frequency)
  }))
)(RadarViz)
