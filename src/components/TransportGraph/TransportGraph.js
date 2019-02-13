import React from "react"
import { Graph } from "@vx/network"
import { Text } from "@vx/text"
import { compose, defaultProps, branch, withState, withStateHandlers, lifecycle, renderComponent } from "recompose"
import { find } from "ramda"
import { withBiggestRoute, withData, withSmallestRoute, withVisualizationConfig } from "../HOC"

import "./TransportGraph.scss"

const TransportGraph = ({ showPicture, width, height, displayProps, firstNodeInScreen }) => (
  <>
    <h1 className={"TransportGraph__heading"}>{displayProps[firstNodeInScreen].label}</h1>
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={"white"} />
      {<Graph graph={displayProps[firstNodeInScreen].graph} />}
      {displayProps[firstNodeInScreen].stopLabels.map((stop, index) => (
        <Text
          scaleToFit={true}
          verticalAnchor="start"
          lineHeight="2"
          key={index}
          className={"TransportGraph__label"}
          {...displayProps[firstNodeInScreen].graph.nodes[index]}
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
  withState(({ displayProps, smallestRouteStops, biggestRouteStops }) => ({
    displayProps: displayProps,
    smallestRouteStops,
    biggestRouteStops
  })),
  withStateHandlers(({ firstNode, displayProps }) => ({ firstNode, displayProps: displayProps, firstNodeInScreen: 0 }), {
    showPicture: ({ displayProps, firstNodeInScreen }) => () => {
      let spot = document.querySelectorAll(".anchor")
      const firstNode = find(a => a.getBoundingClientRect().top > 0)(spot)
      return {
        firstNodeInScreen: firstNode ? firstNode.id : firstNodeInScreen,
        displayProperties: displayProps && firstNodeInScreen && displayProps[firstNodeInScreen.id]
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
  branch(({ displayProps, firstNodeInScreen }) => !displayProps[firstNodeInScreen], renderComponent(() => ""))
)

export default enhancer(TransportGraph)
