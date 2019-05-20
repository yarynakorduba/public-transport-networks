import { renameProps, withProps, compose, branch, renderComponent } from "recompose"
import { withParentSize } from "@vx/responsive"
import connect from "react-redux/es/connect/connect"
import { areDataFetching, getData } from "../reducers"
import { fetchStops } from "../actions"
import { arrayToObject, mapIndexed, removeNodeListFromGraph } from "../helpers"
import { assoc, filter, flip, map, prop, values } from "ramda"
import { prepareDataForGraphSpaceVisualization } from "./GraphVisualization/helpers"

export const withCalculatedChartSize = compose(
  withParentSize,
  renameProps({ parentHeight: "height", parentWidth: "width" }),
  withProps(({ width, height, margin }) => ({
    chartWidth: width - (margin.left + margin.right),
    chartHeight: height - (margin.top + margin.bottom)
  }))
)

export const withStopsData = compose(
  connect(
    (state, { representationOf }) => ({
      data: getData(state, representationOf),
      areDataFetching: areDataFetching(state, representationOf)
    }),
    { fetchNodes: fetchStops }
  ),
  withProps(({ data, setData, fetchNodes, representationOf }) =>
    !data
      ? fetchNodes(representationOf)
      : {
          data
        }
  ),
  branch(({ areDataFetching }) => areDataFetching, renderComponent(() => "Loading the data...")),
  branch(
    ({ data, areDataFetching }) => !data && !areDataFetching,
    renderComponent(() => "Something went wrong. We didn`t manage to load the data...")
  )
)

export const withIndexedStopsData = withProps(({ data }) => ({
  data: compose(
    arrayToObject(prop("id")),
    mapIndexed(flip(assoc("index")))
  )(data)
}))

export const withCleanedFromIntermediateStopsData = withProps(({ data }) => {
  const nodesForRemove = compose(
    map(node => node.id),
    values,
    filter(node => node.connections.length === 2)
  )(data)
  return { data: prepareDataForGraphSpaceVisualization(removeNodeListFromGraph(nodesForRemove, data)) }
})
