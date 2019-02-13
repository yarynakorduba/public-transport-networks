import React from "react"
import { Graph } from "@vx/network"
import { Text } from "@vx/text"
import { compose, defaultProps, branch, withState, withStateHandlers, lifecycle, renderComponent } from "recompose"
import { find } from "ramda"
import { withBiggestRoute, withData, withSmallestRoute, withVisualizationConfig } from "../HOC"

import "./TransportGraph.scss"

const TransportGraph = ({ showPicture, width, height, nodeProps, firstNodeInScreen }) => (
  <>
    <h1 className={"TransportGraph__heading"}>{nodeProps[firstNodeInScreen].label}</h1>
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={"white"} />
      {<Graph graph={nodeProps[firstNodeInScreen].graph} />}
      {nodeProps[firstNodeInScreen].stopLabels.map((stop, index) => (
        <Text
          scaleToFit={true}
          verticalAnchor="start"
          lineHeight="2"
          key={index}
          className={"TransportGraph__label"}
          {...nodeProps[firstNodeInScreen].graph.nodes[index]}
        >
          {stop.substring(8, 12)}
        </Text>
      ))}
    </svg>
  </>
)

const enhancer = compose(
  defaultProps({ width: 600, height: 600, graph: { nodes: [], links: [] }, firstNodeInScreen: 0 }),
  withData,
  withSmallestRoute,
  withBiggestRoute,
  withState(({ nodeProps, smallestRouteStops, biggestRouteStops }) => ({
    nodeProps,
    smallestRouteStops,
    biggestRouteStops
  })),
  withStateHandlers(({ firstNode, nodeProps }) => ({ firstNode, nodeProps, firstNodeInScreen: 0 }), {
    showPicture: ({ nodeProps, firstNodeInScreen }) => () => {
      let spot = document.querySelectorAll(".anchor")
      const firstNode = find(a => a.getBoundingClientRect().top > 0)(spot)
      return {
        firstNodeInScreen: firstNode ? firstNode.id : firstNodeInScreen,
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
  branch(({ graph }) => !graph, renderComponent(() => "Loading the visualization... ... ")),
  branch(({ nodeProps, firstNodeInScreen }) => !nodeProps[firstNodeInScreen], renderComponent(() => ""))
)

export default enhancer(TransportGraph)
