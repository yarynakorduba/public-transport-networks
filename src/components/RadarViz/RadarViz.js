import { Group } from "@vx/group"
import { scaleLinear } from "@vx/scale"
import { Point } from "@vx/point"
import { Line, LineRadial } from "@vx/shape"
import React from "react"
import { compose, defaultProps, withProps } from "recompose"

import data from "../../radar_testik"

import "./RadarViz.scss"
import BEM from "../../helpers/BEM"

const b = BEM("radar-viz")

const genAngles =(length) =>{
  return [...Array(length + 1)].map((_, i) => {
    return {
      angle: i * (360 / length)
    }
  })
}

const genPoints = (length, radius) => {
  const step = Math.PI * 2 / length
  return [...Array(length)].map((_, i) => {
    return {
      x: radius * Math.sin(i * step),
      y: radius * Math.cos(i * step)
    }
  })
}

const getAnchorDirection = (x) =>{
  if (Math.abs(x) < 30) {
    return "middle"
  } else if (x < 0) {
    return "end"
  } else {
    return "start"
  }
}


const genPolygonPoints=(data, scale, access)=> {
  const step = Math.PI * 2 / data.length
  const points = new Array(data.length).fill({})
  const pointString = new Array(data.length + 1).fill("").reduce((res, _, i) => {
    if (i > data.length) return res
    const x = scale(access(data[i - 1])) * Math.sin(i * step)
    const y = scale(access(data[i - 1])) * Math.cos(i * step)
    points[i - 1] = { x, y }
    return (res += `${x},${y} `)
  })
  points.polygon = pointString
  return points
}

const RadarViz = ({ drawChart }) => {
  return drawChart()
}

export default compose(
  defaultProps({
    width: 250,
    height: 250,
    levels: 3,
    margin: {
      top: 40,
      left: 80,
      right: 80,
      bottom: 80
    }, fontSize: 12, textRangeCoeff: 10
  }),
  withProps(({
               width,
               height,
               levels,
               margin,
               fontSize,
               textRangeCoeff
             }) => ({
      drawChart: () => {
        const xMax = width - margin.left - margin.right
        const yMax = height - margin.top - margin.bottom
        const radius = Math.min(xMax, yMax) / 1.3

        const radiusScale = scaleLinear({
          range: [0, Math.PI * 2],
          domain: [0,360]
        })

        const yScale = scaleLinear({
          range: [0, radius],
          domain: [0, Math.max(...data.map(d => d.frequency))]
        })

        const webs = genAngles(data.length)
        const points = genPoints(data.length, radius)
        const polygonPoints = genPolygonPoints(data, yScale, d => d.frequency)
        const zeroPoint = new Point({ x: 0, y: 0 })

        return (
          <svg className={b()} width={width+50} height={height}>
            <rect fill={"none"} width={width} height={height}/>
            <Group top={height / 2} left={width / 2}>
              {/*{[...Array(levels)].map((_, i) => {*/}
                {/*const r = (i + 1) * radius / levels*/}
                {/*return (*/}
                  {/*<LineRadial*/}
                    {/*className={b("line-radial")}*/}
                    {/*key={`web-${i}`}*/}
                    {/*data={webs}*/}
                    {/*angle={points}*/}
                    {/*radius={r}*/}
                  {/*/>*/}
                {/*)*/}
              {/*})}*/}
              {[...Array(data.length)].map((_, i) => {
                var { x, y } = points[i]
                return (
                  <g>
                    <text fontSize={fontSize} textAnchor={getAnchorDirection(x)}
                          className={b("text")}
                          key={`radar-text-${i}`}
                          x={x * fontSize / textRangeCoeff / 1.1}
                          y={y > 0 ? y * fontSize / textRangeCoeff : y * fontSize / textRangeCoeff / 1.1}>{data[i].property}
                    </text>
                    <Line
                      key={`radar-line-${i}`}
                      className={b("line-radial")}
                      from={zeroPoint}
                      to={points[i]}
                    />
                  </g>
                )
              })}
              <polygon
                points={polygonPoints.polygon}
                className={b("polygon")}
              />
              {polygonPoints.map((point, i) => {
                return (
                  <circle
                    key={`radar-point-${i}`}
                    cx={point.x}
                    cy={point.y}
                    r={4}
                    className={b("circle")}
                  />
                )
              })}
            </Group>
          </svg>
        )
      }
    })
  ))(RadarViz)