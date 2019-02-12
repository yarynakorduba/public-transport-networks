import React from "react"
import { Graph } from "@vx/network"
import { compose, defaultProps, branch, withState, withStateHandlers, lifecycle } from "recompose"
import { find } from "ramda"
import { withBiggestRoute, withData, withSmallestRoute, withVisualizationConfig } from "../HOC"
import { renderComponent } from "recompose/index"

const TransportGraph = ({ showPicture, width, height, nodeProps, firstNodeInScreen }) => (
  <svg width={width} height={height}>
    <rect width={width} height={height} rx={14} fill={"white"} />
    {nodeProps[firstNodeInScreen] && <Graph graph={nodeProps[firstNodeInScreen].graph} />}
  </svg>
)

const enhancer = compose(
  defaultProps({ width: 600, height: 600, graph: { nodes: [], links: [] }, firstNodeInScreen: 0 }),
  withData,
  withSmallestRoute,
  withBiggestRoute,
  withState(({ nodeProps, width, height, smallestRouteStops, biggestRouteStops, fill }) => ({
    nodeProps,
    width,
    height,
    smallestRouteStops,
    biggestRouteStops,
    fill
  })),
  withStateHandlers(({ firstNode, nodeProps }) => ({ firstNode, nodeProps, firstNodeInScreen: 0 }), {
    showPicture: ({ nodeProps, firstNodeInScreen }) => () => {
      let spot = document.querySelectorAll(".anchor")
      const firstNode = find(a => a.getBoundingClientRect().top > 0)(spot)
      return {
        firstNodeInScreen: firstNode && firstNode.id,
        displayProperties: nodeProps && firstNodeInScreen && nodeProps[firstNodeInScreen.id]
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener("scroll", () => {
        this.props.showPicture()
      })
    }
  }),
  withVisualizationConfig,
  branch(({ graph }) => !graph, renderComponent(() => "Loading the visualization... ... "))
)

export default enhancer(TransportGraph)
