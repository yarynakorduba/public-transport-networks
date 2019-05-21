import { renameProps, withProps, compose, branch, renderComponent } from "recompose"
import { withParentSize } from "@vx/responsive"
import { connect } from "react-redux"
import { areStationTypesFetching, areStopsFetching, getStationTypes, getStops } from "../reducers"
import { fetchStationTypes, fetchStops } from "../actions"
import { arrayToObject, mapIndexed } from "../helpers"
import { assoc, flip, prop } from "ramda"

export const withCalculatedChartSize = compose(
  withParentSize,
  renameProps({ parentHeight: "height", parentWidth: "width" }),
  withProps(({ width, height, margin }) => ({
    chartWidth: width - (margin.left + margin.right),
    chartHeight: height - (margin.top + margin.bottom)
  }))
)

export const withStationTypes = compose(
  connect(
    (state, { city }) => ({
      stationTypes: getStationTypes(state, city),
      areStationTypesFetching: areStationTypesFetching(state, city)
    }),
    { fetchStationTypes }
  ),
  withProps(
    ({ stationTypes, areStationTypesFetching, fetchStationTypes, city }) =>
      !stationTypes && !areStationTypesFetching && fetchStationTypes(city)
  ),
  branch(({ areStationTypesFetching }) => areStationTypesFetching, renderComponent(() => "Loading the data...")),
  branch(
    ({ stationTypes, areStationTypesFetching }) => !stationTypes && !areStationTypesFetching,
    renderComponent(() => "Something went wrong. We didn`t manage to load the data...")
  )
)
export const withStops = compose(
  connect(
    (state, { city }) => ({
      stops: getStops(state, city),
      areStopsFetching: areStopsFetching(state, city)
    }),
    { fetchStops }
  ),
  withProps(({ stops, areDataFetching, fetchStops, city }) => !stops && !areDataFetching && fetchStops(city)),
  branch(({ areStopsFetching }) => areStopsFetching, renderComponent(() => "Loading the data...")),
  branch(
    ({ stops, areStopsFetching }) => !stops && !areStopsFetching,
    renderComponent(() => "Something went wrong. We didn`t manage to load the data...")
  )
)

export const withIndexedStops = withProps(({ stops }) => ({
  stops: compose(
    arrayToObject(prop("id")),
    mapIndexed(flip(assoc("index")))
  )(stops)
}))
