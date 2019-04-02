import React from "react"
import { Group, scaleLinear } from "@vx/vx"
import { compose, defaultProps, withProps } from "recompose"
import { max } from "d3"
import RadarRay from "./RadarRay"
import RadarPolygon from "./RadarPolygon"
import "./RadarChart.scss"
import BEM from "../../helpers/BEM"

const b = BEM("radar")

const getStep = dataLength => (Math.PI * 2) / dataLength

const genPoints = (data, radius) =>
  [...Array(data.length)].map((_, i) => ({
    x: radius * Math.sin(i * getStep(data.length)),
    y: radius * Math.cos(i * getStep(data.length))
  }))

const genPolygonPoints = (data, scale, getValue) =>{
  return [...Array(data.length)].map((obj, i) => {
    return {
      x: scale(getValue(data[i])) * Math.sin((i + 0.01) * getStep(data.length)),
      y: scale(getValue(data[i])) * Math.cos((i + 0.01) * getStep(data.length))
    }
  })
}

const RadarChart = ({ width, height, radarPoints, polygonPoints, data, color }) => (
  <svg className={b()} width={width} height={height}>
    <Group top={height / 2} left={width / 2}>
      {radarPoints.map((point, i) => (
        <RadarRay rayLabel={data[i].property} targetPoint={point} key={i} />
      ))}
      <RadarPolygon color={color} polygonPointsList={polygonPoints} />
      {polygonPoints.map((point, i) => (
        <circle fill={color} key={i} cx={point.x} cy={point.y} r={4} className={b("circle")} />
      ))}
    </Group>
  </svg>
)

export default compose(
  defaultProps({
    width: 350,
    height: 300,
    margin: {
      top: 30,
      left: 90,
      right: 90,
      bottom: 60
    }
  }),
  withProps(({ width, height, margin, data }) => ({
    radius: (width - margin.left - margin.right) / 2,
    yScale: scaleLinear({
      range: [0, (width - margin.left - margin.right) / 2],
      domain: [0, max(data, d => d.frequency)]
    })
  })),
  withProps(({ radius, yScale, data }) => ({
    radarPoints: genPoints(data, radius),
    polygonPoints: genPolygonPoints(data, yScale, d => d.frequency)
  }))
)(RadarChart)
