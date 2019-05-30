import React from "react"
import { Group, scaleLinear } from "@vx/vx"
import { compose, defaultProps, withProps } from "recompose"
import { maxBy, prop, values, map, reduce, pathOr, filter, mapObjIndexed, head } from "ramda"
import RadarRay from "./RadarRay"
import RadarPolygon from "./RadarPolygon"
import "./RadarChart.scss"
import BEM from "../../helpers/BEM"

const b = BEM("RadarChart")
const RADAR_CIRCLE_RADIUS = 4

const getStepAlongCircle = dataLength => (Math.PI * 2) / dataLength

const genRadarRaysPoints = (data, radius) =>
  data.map((_, i) => ({
    x: radius * Math.sin(i * getStepAlongCircle(data.length)),
    y: radius * Math.cos(i * getStepAlongCircle(data.length))
  }))

const genRadarPolygonPoints = (data, scale) =>
  data.map(({ propertyValue }, i) => ({
    x: scale(propertyValue) * Math.sin((i + 0.01) * getStepAlongCircle(data.length)),
    y: scale(propertyValue) * Math.cos((i + 0.01) * getStepAlongCircle(data.length))
  }))

export const RadarChart = ({ width, height, raysPoints, polygonData, cityPropertiesLabels }) => (
  <svg className={b()}>
    <Group className={b("container")} width={width} height={height}>
      {raysPoints.map((point, i) => (
        <RadarRay rayLabel={cityPropertiesLabels[i]} targetPoint={point} key={i} />
      ))}
      {polygonData.map(({ color, data }, i) => (
        <Group key={i}>
          <RadarPolygon color={color} polygonPointsList={data} />
          {data.map(({ x, y }) => (
            <circle fill={color} key={`${x},${y}`} cx={x} cy={y} r={RADAR_CIRCLE_RADIUS} className={b("circle")} />
          ))}
        </Group>
      ))}
    </Group>
  </svg>
)

export default compose(
  defaultProps({
    width: 350,
    height: 350,
    margin: {
      top: 90,
      left: 0,
      right: 0,
      bottom: 90
    }
  }),
  withProps(({ width, height, margin: { top, bottom }, data }) => ({
    radius: (width - top - bottom) / 2,
    yScale: scaleLinear({
      range: [0, (height - top - bottom) / 2],
      domain: [0, 1]
    }),
    cityPropertiesLabels: compose(
      data => data.map(prop("propertyLabel")),
      values,
      prop("data"),
      head,
      values
    )(data)
  })),
  withProps(({ data }) => ({
    data: compose(
      mapObjIndexed(city => ({
        ...city,
        data: mapObjIndexed(({ propertyValue, ...rest }, propertyKey) => ({
          ...rest,
          propertyValue:
            propertyValue /
            reduce(maxBy(pathOr(0, ["data", propertyKey, "propertyValue"])), 0, values(data))["data"][propertyKey][
              "propertyValue"
            ]
        }))(city.data)
      }))
    )(data)
  })),
  withProps(({ radius, data, yScale, maxPropertyValues, cityPropertiesLabels }) => ({
    raysPoints: genRadarRaysPoints(cityPropertiesLabels, radius),
    polygonData: compose(
      map(city => ({ ...city, data: genRadarPolygonPoints(values(prop("data", city)), yScale) })),
      filter(prop("active")),
      values
    )(data)
  }))
)(RadarChart)
