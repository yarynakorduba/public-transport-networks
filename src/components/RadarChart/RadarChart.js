import React, { Fragment } from "react"
import { Group, scaleLinear } from "@vx/vx"
import { compose, defaultProps, withProps } from "recompose"
import { maxBy, prop, values, map, reduce, head, indexBy, pathOr } from "ramda"
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

const genRadarPolygonPoints = (data, maxPropertyValues, scale) =>
  data.map(({ propertyValue, propertyName }, index) => ({
    x:
      scale(propertyValue / maxPropertyValues[propertyName]["propertyValue"]) *
      Math.sin((index + 0.01) * getStepAlongCircle(data.length)),
    y:
      scale(propertyValue / maxPropertyValues[propertyName]["propertyValue"]) *
      Math.cos((index + 0.01) * getStepAlongCircle(data.length))
  }))

const RadarChart = ({ width, height, raysPoints, polygonData, radarChartData, cityProperties }) => (
  <svg className={b()} width={width} height={height}>
    <Group top={height / 2} left={width / 2}>
      {raysPoints.map((point, i) => (
        <RadarRay rayLabel={cityProperties[i]} targetPoint={point} key={i} />
      ))}

      {polygonData.map(
        (cityPolygon, i) =>
          cityPolygon && (
            <Fragment key={i}>
              <RadarPolygon color={radarChartData[i].color} polygonPointsList={cityPolygon} />
              {cityPolygon.map(({ x, y }, index) => (
                <circle
                  fill={radarChartData[i].color}
                  key={index}
                  cx={x}
                  cy={y}
                  r={RADAR_CIRCLE_RADIUS}
                  className={b("circle")}
                />
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
  //TODO: simplify
  withProps(({ data }) => ({
    maxPropertyValues: compose(
      indexBy(prop("propertyName")),
      map(({ propertyName }) => ({
        propertyName,
        ["propertyValue"]: reduce(
          maxBy(pathOr(0, [propertyName, "propertyValue"])),
          0,
          compose(
            map(indexBy(prop("propertyName"))),
            map(prop("data")),
            values
          )(data)
        )[propertyName]["propertyValue"]
      })),
      prop("data"),
      head,
      values
    )(data)
  })),
  withProps(({ radius, data, yScale, maxPropertyValues }) => ({
    raysPoints: genRadarRaysPoints(values(data)[0].data, radius),
    polygonData: values(data).map(city => city.active && genRadarPolygonPoints(city.data, maxPropertyValues, yScale)),
    cityProperties: values(data)[0].data.map(prop("propertyName")),
    radarChartData: values(data)
  }))
)(RadarChart)
