import { renameProps, withProps, compose } from "recompose"
import { withParentSize } from "@vx/responsive"
import { connect } from "react-redux"
import { areStationTypesFetching, getStationTypes } from "../reducers/index"
import { fetchStationTypes } from "../actions/index"

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
  )
)
