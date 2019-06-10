import React from "react"
import { Group, scaleLinear } from "@vx/vx"
import { compose, defaultProps, withProps } from "recompose"
import { maxBy, includes, values, map, reduce, pathOr, indexOf, keys, mapObjIndexed, pickBy } from "ramda"
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
  mapObjIndexed(
    (propValue, propKey) => ({
      x: scale(propValue) * Math.sin((indexOf(propKey, keys(data)) + 0.01) * getStepAlongCircle(keys(data).length)),
      y: scale(propValue) * Math.cos((indexOf(propKey, keys(data)) + 0.01) * getStepAlongCircle(keys(data).length))
    }),
    data
  )

export const RadarChart = ({ width, height, raysPoints, polygonData, colors, labels, citiesKeys, propertiesKeys }) => (
  <svg className={b()}>
    <Group className={b("container")} width={width} height={height}>
      {raysPoints.map((point, i) => (
        <RadarRay rayLabel={labels[propertiesKeys[i]]} targetPoint={point} key={i} />
      ))}

      {polygonData.map(({ color, data, ...props }, i) => (
        <Group key={i}>
          <RadarPolygon color={colors[citiesKeys[i]]} polygonPointsList={values(data)} />
          {map(
            ({ x, y }) => (
              <circle
                fill={colors[citiesKeys[i]]}
                key={`${x},${y}`}
                cx={x}
                cy={y}
                r={RADAR_CIRCLE_RADIUS}
                className={b("circle")}
              />
            ),
            values(data)
          )}
        </Group>
      ))}
    </Group>
  </svg>
)

export default compose(
  defaultProps({
    width: 850,
    height: 350,
    margin: {
      top: 90,
      left: 30,
      right: 30,
      bottom: 90
    }
  }),
  withProps(({ width, height, margin: { top, bottom, right, left }, data }) => ({
    radius: (height - top - bottom ) / 2,
    yScale: scaleLinear({
      range: [0, (height - top - bottom) / 2],
      domain: [0, 1]
    }),
    citiesKeys: keys(data),
    propertiesKeys: keys(values(data)[0]),
    activeCities: ["lviv", "bristol"]
  })),
  withProps(({ data }) => ({
    data: compose(
      mapObjIndexed(city =>
        mapObjIndexed(
          (propertyValue, propertyKey) =>
            propertyValue / reduce(maxBy(pathOr(0, [propertyKey])), 0, values(data))[propertyKey]
        )(city)
      )
    )(data)
  })),
  withProps(({ radius, data, yScale, labels, propertiesKeys, displayedCities }) => ({
    raysPoints: genRadarRaysPoints(propertiesKeys, radius),
    polygonData: compose(
      map(city => ({
        ...city,
        data: genRadarPolygonPoints(city, yScale)
      })),
      values,
      pickBy((val, key) => includes(key, displayedCities))
    )(data)
  }))
)(RadarChart)
