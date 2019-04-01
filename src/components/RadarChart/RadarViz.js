import React from "react"
import { Group, scaleLinear } from "@vx/vx"
import { branch, compose, defaultProps, mapPropsStream, renderComponent, withProps } from "recompose"
import { max } from "d3"
import RadarRay from "./RadarRay"
import RadarPolygon from "./RadarPolygon"
import "./RadarViz.scss"
import BEM from "../../helpers/BEM"
import { ajax } from "rxjs/ajax"
import { map } from "rxjs/operators"
import { combineLatest } from "rxjs"

const b = BEM("RadarViz")

const getStep = dataLength => (Math.PI * 2) / dataLength

const genPoints = (data, radius) =>
  [...Array(data.length)].map((_, i) => ({
    x: radius * Math.sin(i * getStep(data.length)),
    y: radius * Math.cos(i * getStep(data.length))
  }))

const genPolygonPoints = (data, scale, getValue) =>
  [...Array(data.length)].map((obj, i) => ({
    x: scale(getValue(data[i])) * Math.sin((i + 1) * getStep(data.length)),
    y: scale(getValue(data[i])) * Math.cos((i + 1) * getStep(data.length))
  }))

const RadarViz = ({ drawChart, width, height, radarPoints, polygonPoints, data }) => (
  <svg className={b()} width={width} height={height}>
    <Group top={height / 2} left={width / 2}>
      {radarPoints.map((point, i) => (
        <RadarRay rayLabel={data[i].property} targetPoint={point} key={i} />
      ))}
      <RadarPolygon polygonPointsList={polygonPoints} />
      {polygonPoints.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r={4} className={b("circle")} />
      ))}
    </Group>
  </svg>
)

export default compose(
  defaultProps({
    width: 350,
    height: 300,
    margin: {
      top: 40,
      left: 100,
      right: 100,
      bottom: 80
    }
  }),
  mapPropsStream(props$ => {
    const data$ = ajax.getJSON("/data/test_radar_data.json")
    return combineLatest(props$, data$).pipe(map(([props, data]) => ({ ...props, data })))
  }),
  branch(({ data }) => !data, renderComponent(() => "Loading the data...")),
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
)(RadarViz)
