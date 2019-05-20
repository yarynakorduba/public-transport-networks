// @flow
import React, { useEffect, useRef } from "react"
import { prop, path } from "ramda"
import { extent, select } from "d3"
import { compose, defaultProps, withProps, withStateHandlers } from "recompose"
import {
  getForceSimulation,
  getDefaultSpaceGraphScales,
  getDragHandler,
  getRadialSpaceGraphScales,
  getRadialForceSimulation
} from "./helpers"
import BEM from "../../helpers/BEM"
import {
  withCalculatedChartSize,
  withCleanedFromIntermediateStopsData,
  withIndexedStopsData,
  withStopsData
} from "../HOC"
import "./ForceGraph.scss"
const b = BEM("ForceGraph")

const ForceGraph = ({ chartHeight, chartWidth, drawChart, isRadial, setIsRadial, representationOf, space }) => {
  const rootEl = useRef(null)
  useEffect(() => drawChart(rootEl.current), [isRadial])

  return (
    <>
      <header className={b("header")}>
        <label className={b("city")}>
          {representationOf}, {space}-space
        </label>
        <label className={b("is-radial-label")}>
          <input className={b("is-radial-input")} type={"checkbox"} value={isRadial} onChange={setIsRadial} />
          Radial
        </label>
      </header>
      <svg ref={rootEl} className={b()} height={chartHeight} width={chartWidth} />
    </>
  )
}

const enhancer = compose(
  defaultProps({
    width: 600,
    height: 400,
    margin: { top: 0, left: 0, bottom: 100, right: 0 },
    showLabels: false
  }),
  // chart size definition
  withCalculatedChartSize,
  // data processing
  withStopsData,
  withIndexedStopsData,
  withCleanedFromIntermediateStopsData,
  withStateHandlers(
    () => ({
      isRadial: false
    }),
    {
      setIsRadial: () => ev => ({
        isRadial: ev.target.checked
      })
    }
  ),
  withProps(
    ({ chartWidth, chartHeight, getVisualizationScales, getSimulationType, data, isRadial }) => {
      const connectionsDomain = extent(data.nodes, path(["connections", "length"]))
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
    }
  ),
  withProps(
    ({
      chartWidth,
      chartHeight,
      data,
      showLabels,
      simulation,
      nodeSpaceRadiusScale,
      nodeRadiusScale,
      positionScale,
      colorScale,
      fontSizeScale
    }) => ({
      drawChart: rootEl => {
        const dragHandler = getDragHandler(simulation)
        const svg = select(rootEl)
        svg.selectAll("*").remove()
        const links = svg
          .append("g")
          .attr("class", b("links"))
          .selectAll(b("line"))
          .data(data.links)
          .enter()
          .append("line")
          .attr("class", b("line"))

        const nodes = svg
          .append("g")
          .selectAll(b("node"))
          .data(data.nodes)
          .enter()
          .append("g")
          .attr("class", b("node"))
          .on("click", d => console.log(d))
          .call(dragHandler)
          .append("circle")
          .attr("fill", d => colorScale(d.connections.length))
          .attr("r", ({ r }) => nodeRadiusScale(r))

        if (showLabels) {
          nodes
            .append("g")
            .attr("class", b("labels"))
            .append("text")
            .attr("class", b("text-label"))
            .text(prop("label"))
            .attr("font-size", ({ r }) => fontSizeScale(r) + "rem")
        }

        simulation
          .nodes(data.nodes)
          .on("tick", () => {
            links
              .attr("x1", d => d.source.x)
              .attr("y1", d => d.source.y)
              .attr("x2", d => d.target.x)
              .attr("y2", d => d.target.y)

            nodes.attr("transform", ({ x, y }) => `translate(${x}, ${y})`)
          })
          .force("link")
          .links(data.links)
      }
    })
  )
)

export default enhancer(ForceGraph)
