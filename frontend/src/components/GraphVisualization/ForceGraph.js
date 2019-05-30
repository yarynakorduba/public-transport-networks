// @flow
import React, { useEffect, useRef } from "react"
import { path, map, values, filter } from "ramda"
import { extent, select } from "d3"
import { compose, defaultProps, withProps, withStateHandlers } from "recompose"
import {
  getForceSimulation,
  getDefaultSpaceGraphScales,
  getDragHandler,
  getRadialSpaceGraphScales,
  getRadialForceSimulation,
  prepareDataForGraphSpaceVisualization
} from "./helpers"
import { removeNodeListFromGraph } from "../../helpers/index"
import { withCalculatedChartSize, withIndexedStops, withStops } from "../HOC"
import BEM from "../../helpers/BEM"
import "./ForceGraph.scss"
const b = BEM("ForceGraph")

//TODO: decide whether to add clusterization
const drawChart = compose(
  defaultProps({
    margin: { top: 0, left: 0, bottom: 100, right: 0 }
  }),
  // chart size definition
  withCalculatedChartSize,
  withStateHandlers(
    ({ isRadial }) => ({
      isRadial: isRadial
    }),
    {
      setIsRadial: () => ev => ({
        isRadial: ev.target.checked
      })
    }
  ),
  withProps(({ chartWidth, chartHeight, graphData, isRadial }) => {
    const connectionsDomain = extent(graphData.nodes, path(["connections", "length"]))
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
        const dragHandler = getDragHandler(simulation)
        const svg = select(rootEl)
        svg.selectAll("*").remove()
        const links = svg
          .append("g")
          .attr("class", b("links"))
          .selectAll(b("line"))
          .data(graphData.links)
          .enter()
          .append("line")
          .attr("class", b("line"))

        const nodes = svg
          .append("g")
          .selectAll(b("node"))
          .data(graphData.nodes)
          .enter()
          .append("g")
          .attr("class", b("node"))
          .on("click", d => console.log(d))
          .call(dragHandler)
          .append("circle")
          .attr("fill", d => colorScale(d.connections.length))
          .attr("r", d => nodeRadiusScale(d.connections.length))

        const constrainPositionToBoundingBox = (element, coordinate) => {
          const boundary = coordinate === "x" ? chartWidth : chartHeight
          return Math.max(
            nodeRadiusScale(element.connections.length),
            Math.min(boundary - nodeRadiusScale(element.connections.length), element[coordinate])
          )
        }

        simulation
          .nodes(graphData.nodes)
          .on("tick", () => {
            nodes
              .attr("cx", d => constrainPositionToBoundingBox(d, "x"))
              .attr("cy", d => constrainPositionToBoundingBox(d, "y"))
            links
              .attr("x1", d => constrainPositionToBoundingBox(d.source, "x"))
              .attr("y1", d => constrainPositionToBoundingBox(d.source, "y"))
              .attr("x2", d => constrainPositionToBoundingBox(d.target, "x"))
              .attr("y2", d => constrainPositionToBoundingBox(d.target, "y"))
          })
          .force("link")
          .links(graphData.links)
      }
    })
  )
)

export const ForceGraph = drawChart(({ chartHeight, chartWidth, drawChart, isRadial, setIsRadial, city, space }) => {
  const rootEl = useRef(null)
  useEffect(() => drawChart(rootEl.current), [isRadial])
  return (
    <>
      <header className={b("header")}>
        <label className={b("city")}>
          {city}, {space}-space
        </label>
        <label className={b("is-radial-label")}>
          <input className={b("is-radial-input")} type={"checkbox"} checked={isRadial} onChange={setIsRadial} />
          Radial
        </label>
      </header>
      <svg ref={rootEl} className={b()} height={chartHeight} width={chartWidth} />
    </>
  )
})

const enhancer = compose(
  // data processing
  withStops,
  withIndexedStops,
  withProps(({ stops }) => {
    const nodesForRemove = compose(
      map(node => node.id),
      values,
      filter(node => node.connections.length === 2)
    )(stops)
    return {
      graphData: prepareDataForGraphSpaceVisualization(removeNodeListFromGraph(nodesForRemove, stops))
    }
  })
)

export default enhancer(ForceGraph)
