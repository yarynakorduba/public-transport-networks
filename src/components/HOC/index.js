import { branch, renderComponent, withProps, compose } from "recompose"
import { pairs, scan } from "d3"
import { connect } from "react-redux"
import { fetchRoutes } from "../../actions"

const lengthComparator = (a, b) => a.length - b.length

export const withData = compose(
  connect(
    state => ({
      data: state.data.routes
    }),
    { fetchRoutes }
  ),
  withProps(async ({ data, fetchRoutes }) => {
    !data && fetchRoutes() // if no data then fetch it
  }),
  branch(({ data }) => !data, renderComponent(() => "Loading data for the visualization..."))
)

export const withSmallestRoute = compose(
  withProps(({ data }) => ({
    smallestRoute: Object.keys(data)[scan(Object.keys(data), (a, b) => lengthComparator(data[a], data[b]))]
  })),
  withProps(({ smallestRoute, data }) => ({
    smallestRouteStops: data[smallestRoute]
  }))
)

export const withBiggestRoute = compose(
  withProps(({ data }) => ({
    biggestRoute: Object.keys(data)[scan(Object.keys(data), (a, b) => lengthComparator(data[b], data[a]))]
  })),
  withProps(({ biggestRoute, data }) => ({
    biggestRouteStops: data[biggestRoute]
  }))
)

const pair = (a, b) => ({ source: a, target: b })

export const withVisualizationConfig = withProps(({ smallestRouteStops, biggestRouteStops, height, width }) => ({
  displayProps: {
    "1": {
      backgroundColor: "lemongrass",
      label: "Shortest route",
      stopLabels: smallestRouteStops,
      graph: {
        nodes: [
          ...smallestRouteStops.map((stop, index) => ({
            x: (width / smallestRouteStops.length - 20) * index + 20,
            y: height / 3.5 + (index % 2) * 100
          }))
        ],
        links: [
          ...pairs(
            [
              ...smallestRouteStops.map((stop, index) => ({
                x: (width / smallestRouteStops.length - 20) * index + 20,
                y: height / 3.5 + (index % 2) * 100
              }))
            ],
            pair
          )
        ]
      }
    },
    "2": {
      backgroundColor: "yellow",
      label: "Longest route",
      stopLabels: biggestRouteStops,
      graph: {
        nodes: [
          ...biggestRouteStops.map((stop, index) => ({
            x: (width / 1.25 / biggestRouteStops.length) * index + 15,
            y: height / 10 + (index % 5) * 100
          }))
        ],
        links: [
          ...pairs(
            [
              ...biggestRouteStops.map((stop, index) => ({
                x: (width / 1.25 / biggestRouteStops.length) * index + 15,
                y: height / 10 + (index % 5) * 100
              }))
            ],
            pair
          )
        ]
      }
    }
  }
}))