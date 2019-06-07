// @flow
import React, { useEffect, useRef } from "react"
import { groupBy, mapObjIndexed, path } from "ramda"
import { drag, forceLink, select } from "d3"
import { compose, defaultProps, withProps, withStateHandlers } from "recompose"
import {
  getForceSimulation,
  getDefaultSpaceGraphScales,
  getRadialSpaceGraphScales,
  getRadialForceSimulation,
  dragStarted,
  dragged,
  dragEnded,
  getSubject
} from "./helpers"
import { withCalculatedChartSize } from "../HOC"
import BEM from "../../helpers/BEM"
import "./ForceGraph.scss"

const b = BEM("ForceGraph")

const drawChart = compose(
  defaultProps({
    margin: { top: 0, left: 0, bottom: 100, right: 0 }
  }),
  // chart size definition
  withCalculatedChartSize,
  withStateHandlers(
    ({ isRadial }) => ({
      isRadial
    }),
    {
      setIsRadial: () => ev => ({
        isRadial: ev.target.checked
      })
    }
  ),
  withProps(({ chartWidth, chartHeight, graphData, isRadial, extent }) => {
    const connectionsDomain = extent ? extent : extent(graphData.nodes, path(["connections", "length"]))

    const { nodeRadiusScale, nodeSpaceRadiusScale, positionScale, colorScale, fontSizeScale } = isRadial
      ? getRadialSpaceGraphScales(connectionsDomain)
      : getDefaultSpaceGraphScales(connectionsDomain)

    return {
      nodeRadiusScale,
      nodeSpaceRadiusScale,
      positionScale,
      colorScale,
      fontSizeScale,
      simulation: isRadial
        ? getRadialForceSimulation(chartWidth, chartHeight, nodeSpaceRadiusScale, positionScale)
        : getForceSimulation(chartWidth, chartHeight, nodeSpaceRadiusScale, positionScale)
    }
  }),
  withProps(
    ({
      chartWidth,
      chartHeight,
      graphData,
      showLabels,
      simulation,
      nodeSpaceRadiusScale,
      nodeRadiusScale,
      positionScale,
      colorScale
    }) => ({
      drawChart: rootEl => {
        const svg = select(rootEl)
        const context = svg.node().getContext("2d")

        const constrainPositionToBoundingBox = (element, coordinate) => {
          const boundary = coordinate === "x" ? chartWidth : chartHeight
          return Math.max(
            nodeRadiusScale(element.connections.length),
            Math.min(boundary - nodeRadiusScale(element.connections.length), element[coordinate])
          )
        }

        svg.call(
          drag()
            .container(rootEl)
            .subject(() => getSubject(graphData))
            .on("start", () => dragStarted(simulation))
            .on("drag", dragged)
            .on("end", () => dragEnded(simulation))
        )

        const groupedNodes = groupBy(node => node.connections.length, graphData.nodes)

        simulation
          .nodes(graphData.nodes)
          .on("tick", () => {
            context.clearRect(0, 0, chartWidth, chartHeight)
            context.strokeStyle = "#ccc"
            context.beginPath()
            graphData.links.forEach(d => {
              context.moveTo(
                constrainPositionToBoundingBox(d.source, "x"),
                constrainPositionToBoundingBox(d.source, "y")
              )
              context.lineTo(
                constrainPositionToBoundingBox(d.target, "x"),
                constrainPositionToBoundingBox(d.target, "y")
              )
            })
            context.stroke()
            // draw nodes with optimization
            mapObjIndexed((nodeGroup, connectionsNumber) => {
              context.fillStyle = colorScale(Number(connectionsNumber))
              context.beginPath()
              nodeGroup.forEach(d => {
                const x = constrainPositionToBoundingBox(d, "x")
                const y = constrainPositionToBoundingBox(d, "y")

                context.moveTo(x, y)
                context.arc(x, y, nodeRadiusScale(Number(connectionsNumber)), 0, 2 * Math.PI)
              })
              context.fill()
            }, groupedNodes)
          })
          .force("link", forceLink(graphData.links).id(({ id }) => id))
      }
    })
  )
)

export const ForceGraph = ({ chartHeight, chartWidth, drawChart, isRadial = false, setIsRadial, city, space }) => {
  const rootEl = useRef(null)
  useEffect(() => drawChart(rootEl.current), [isRadial])
  return (
    <>
      <header className={b("header")}>
        <label className={b("city")}>
          {city}, {space}-space
        </label>
        <form>
          <label className={b("is-radial-label")}>
            <input className={b("is-radial-input")} type={"checkbox"} checked={isRadial} onChange={setIsRadial} />
            Radial
          </label>
        </form>
      </header>
      <canvas ref={rootEl} className={b()} height={chartHeight} width={chartWidth} />
    </>
  )
}

export default drawChart(ForceGraph)
