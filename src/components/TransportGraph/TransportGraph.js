import React, { Component } from "react"
import { Graph } from "@vx/network"
import { Text } from "@vx/text"
import { withProps, compose, withState, branch, renderComponent, defaultProps } from "recompose"
import { find } from "ramda"
import { json, scan, pairs } from "d3"

const lengthComparator = (a, b) => a.length - b.length
const pair = (a, b) => ({ source: a, target: b })

class TransportGraph extends Component {
  constructor(props) {
    super(props)
    const { nodes, links, width, height, trigger, smallestRouteStops } = props
    this.trigger = trigger
    this.state = {
      nodes: nodes,
      links: links,
      width: width,
      height: height,
      smallestRouteStops: smallestRouteStops,
      nodeProps: { "1": { backgroundColor: "blue" }, "2": { backgroundColor: "yellow" } },
      firstNodeInScreen: 0,
      fill: "white"
    }
  }

  isAtPosition() {
    let spot = document.querySelectorAll(".anchor")
    const firstNodeInScreen = find(a => a.getBoundingClientRect().top > 0)(spot)
    this.setState({ firstNodeInScreen: firstNodeInScreen.id })
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      this.showPicture()
    })
  }

  showPicture() {
    this.isAtPosition()
    this.setState({
      fill:
        this.state.nodeProps[this.state.firstNodeInScreen] &&
        this.state.nodeProps[this.state.firstNodeInScreen].backgroundColor
    })
  }

  render() {
    const { nodes, links, width, height, fill, smallestRouteStops } = this.state
    this.graph = {
      nodes,
      links
    }

    return (
      <svg width={width} height={height}>
        <rect width={width} height={height} rx={14} fill={fill} />
        <Graph graph={this.graph} />
        {smallestRouteStops.map((stop, index) => (
          <Text
            scaleToFit={true}
            verticalAnchor="start"
            lineHeight="2"
            key={index}
            style={{ color: "black", backgroundColor: "white" }}
            {...nodes[index]}
          >
            {stop.substring(8, 12)}
          </Text>
        ))}
      </svg>
    )
  }
}

const enhancer = compose(
  withState("data", "setData"),
  defaultProps({ width: 800, height: 600 }),
  withProps(async ({ data, setData }) => {
    if (!data) {
      const data = await json("bristol_BUS.json", data => data)
      setData(data)
    }
  }),
  branch(({ data }) => !data, renderComponent(() => "Loading data for the visualization...")),
  withProps(({ data }) => ({
    biggestRoute: Object.keys(data)[scan(Object.keys(data), (a, b) => lengthComparator(data[b], data[a]))],
    smallestRoute: Object.keys(data)[scan(Object.keys(data), (a, b) => lengthComparator(data[a], data[b]))]
  })),
  withProps(({ biggestRoute, smallestRoute, data }) => ({
    biggestRouteStops: data[biggestRoute],
    smallestRouteStops: data[smallestRoute]
  })),
  withProps(({ smallestRouteStops, height, width }) => ({
    nodes: [
      ...smallestRouteStops.map((stop, index) => ({
        x: (width / smallestRouteStops.length - 20) * index + 50,
        y: height / 2.5 + (index % 2) * 100
      }))
    ]
  })),
  withProps(({ nodes }) => ({
    links: [...pairs(nodes, pair)]
  })),
  withProps(({ ...props }) => console.log("props", props) || props),
  withProps(({ nodes, links }) => ({
    graph: {
      nodes,
      links
    }
  }))
)

export default enhancer(TransportGraph)
