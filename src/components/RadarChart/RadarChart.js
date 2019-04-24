import React, { Fragment } from "react"
import { Group, scaleLinear } from "@vx/vx"
import { compose, defaultProps, withProps } from "recompose"
import { values } from "ramda"
import RadarRay from "./RadarRay"
import RadarPolygon from "./RadarPolygon"
import "./RadarChart.scss"
import BEM from "../../helpers/BEM"

const b = BEM("RadarChart")
const RADAR_CIRCLE_RADIUS = 4

const getCircleStep = dataLength => (Math.PI * 2) / dataLength

const genPoints = (data, radius) =>
  data.map((_, i) => ({
    x: radius * Math.sin(i * getCircleStep(data.length)),
    y: radius * Math.cos(i * getCircleStep(data.length))
  }))

const genPolygonPoints = (data, scale) =>
  data.map((obj, i) => ({
    x: scale(obj.frequency) * Math.sin((i + 0.01) * getCircleStep(data.length)),
    y: scale(obj.frequency) * Math.cos((i + 0.01) * getCircleStep(data.length))
  }))

const RadarChart = ({ width, height, radarPoints, polygonData, radarChartData, cityProperties }) => (
  <svg className={b()} width={width} height={height}>
    <Group top={height / 2} left={width / 2}>
      {radarPoints.map((point, i) => (
        <RadarRay rayLabel={cityProperties[i]} targetPoint={point} key={i} />
      ))}

      {polygonData.map(
        (item, i) =>
          item && (
            <Fragment key={i}>
              <RadarPolygon color={radarChartData[i].color} polygonPointsList={item} />
              {item.map((point, k) => (
                <circle
                  fill={radarChartData[i].color}
                  key={k}
                  cx={point.x}
                  cy={point.y}
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
  withProps(({ radius, data, yScale }) => ({
    radarPoints: genPoints(values(data)[0].data, radius),
    polygonData: values(data).map(item => item.active && genPolygonPoints(item.data, yScale)),
    cityProperties: values(data)[0].data.map(propertyInfo => propertyInfo.property),
    radarChartData: values(data)
  }))
)(RadarChart)
