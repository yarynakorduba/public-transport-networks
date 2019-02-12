import React from "react"
import { compose } from "ramda"
import { Graph } from "@vx/network"
import { json } from "d3"
import TransportGraph from "../TransportGraph"
import { withProps } from "recompose"

import "./GraphContainer.scss"

// const GraphContainer = ({ width, height, graph }) => (
//   <div>
//     <svg width={width} height={height}>
//       <Graph graph={graph} />
//     </svg>
//   </div>
// )
//
// const enhancer = compose(
//   withProps(async ({ data, setData }) => {
//     const transportData = await json(
//       "london_BUS.json",
//       data => console.log("123456") || data["QSNCC  130FEB20110501201211300000010 XRV1       06              I"]
//     )
//   }),
//   withProps(() => ({
//     width: 750,
//     height: 550,
//     nodes: [
//       { x: Math.floor(Math.random() * 700), y: Math.floor(Math.random() * 500) },
//       { x: Math.floor(Math.random() * 700), y: Math.floor(Math.random() * 500) },
//       { x: Math.floor(Math.random() * 700), y: Math.floor(Math.random() * 500) }
//     ]
//   })),
//   withProps(({ nodes }) => ({
//     links: [
//       { source: nodes[0], target: nodes[1] },
//       { source: nodes[1], target: nodes[2] },
//       { source: nodes[2], target: nodes[0] }
//     ]
//   })),
//   withProps(({ nodes, links }) => ({
//     graph: { nodes, links }
//   }))
// )
//
// export default enhancer(GraphContainer)

const GraphContainer = () => (
  <div className={"GraphContainer"}>
    <TransportGraph />
  </div>
)
export default GraphContainer
