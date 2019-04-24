import React, { Fragment } from "react"
import { Group, scaleLinear } from "@vx/vx"
import { compose, defaultProps, withProps } from "recompose"
import RadarRay from "./RadarRay"
import RadarPolygon from "./RadarPolygon"
import "./RadarChart.scss"
import BEM from "../../helpers/BEM"

const b = BEM("radar")

const getStep = dataLength => (Math.PI * 2) / dataLength

const genPoints = (data, radius) =>
  data.map((_, i) => ({
    x: radius * Math.sin(i * getStep(data.length)),
    y: radius * Math.cos(i * getStep(data.length))
  }))

const genPolygonPoints = (data, scale, getValue) =>
  data.map((obj, i) => ({
    x: scale(getValue(obj)) * Math.sin((i + 0.01) * getStep(data.length)),
    y: scale(getValue(obj)) * Math.cos((i + 0.01) * getStep(data.length))
  }))

const RadarChart = ({ width, height, radarPoints, polygonData, data, color }) => (
  <svg className={b()} width={width} height={height}>
    <Group top={height / 2} left={width / 2}>
      {radarPoints.map((point, i) => (
        <RadarRay rayLabel={data[0][i].property} targetPoint={point} key={i} />
      ))}
      {polygonData.map(
        (item, i) =>
          item && (
            <Fragment key={i}>
              <RadarPolygon color={color[i]} polygonPointsList={item} />
              {item.map((point, k) => (
                <circle fill={color[i]} key={k} cx={point.x} cy={point.y} r={4} className={b("circle")} />
              ))}
            </Fragment>
          )
      )}
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
  withProps(({ width, height, margin }) => ({
    radius: (width - margin.left - margin.right) / 2,
    yScale: scaleLinear({
      range: [0, (width - margin.left - margin.right) / 2],
      domain: [0, 1]
    })
  })),
  withProps(({ radius, data }) => ({
    radarPoints: genPoints(data[0], radius)
  })),
  withProps(({ yScale, data, currentCity }) => ({
    polygonData: data.map((item, i) => currentCity[i].active && genPolygonPoints(item, yScale, d => d.frequency))
  }))
)(RadarChart)
