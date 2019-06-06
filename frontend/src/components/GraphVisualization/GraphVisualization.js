import React from "react"
import ForceGraph from "./ForceGraph"
import { assoc, compose, filter, flip, map, prop, values, any, equals, pathEq, path } from "ramda"
import { withProps, defaultProps, branch, renderComponent } from "recompose"
import { max, min } from "d3"
import { prepareDataForGraphSpaceVisualization } from "./helpers"
import {
  arrayToObject,
  convertBusStopsDataToGeoJSON,
  convertBusStopsGeoJSONToJson,
  mapIndexed,
  removeNodeListFromGraph
} from "../../helpers"
import BEM from "../../helpers/BEM"
import connect from "react-redux/es/connect/connect"
import { areStopsFetching, getStops } from "../../reducers"
import { fetchStops } from "../../actions"
import { clustersDbscan } from "@turf/turf"
import "./GraphVisualization.scss"

const b = BEM("GraphVisualization")

export const clusterizeDataForGraphSpaceVisualization = data => {
  return compose(
    convertBusStopsGeoJSONToJson,
    data => clustersDbscan(data, 0.04, { mutate: true, minPoints: 2 }),
    convertBusStopsDataToGeoJSON
  )(data)
}

const GraphVisualization = ({ data, extent, space }) => (
  <div className={b()}>
    {data.map((city, index) => (
      <div key={index} className={b("graph")}>
        <ForceGraph space={space} graphData={city.graphData} city={city.label} extent={extent} />
      </div>
    ))}
  </div>
)
const enhancer = compose(
  // data processing
  defaultProps({
    cities: ["lviv", "bristol"]
  }),
  connect(
    (state, { cities }) => ({
      data: map(
        city => ({ label: city, stops: getStops(state, city), areFetching: areStopsFetching(state, city) }),
        cities
      )
    }),
    { fetchStops }
  ),
  branch(({ data }) => any(equals(true), map(prop("areFetching"), data)), renderComponent(() => "Loading the data...")),
  branch(
    ({ data }) => any(equals(true), map(oneCityStops => !oneCityStops.stops, data)),
    renderComponent(() => "Something went wrong. No data provided...")
  ),
  withProps(({ data }) => ({
    data: map(
      city => ({
        ...city,
        stops: compose(
          arrayToObject(prop("id")),
          mapIndexed(flip(assoc("index"))),
          clusterizeDataForGraphSpaceVisualization
        )(city.stops)
      }),
      data
    )
  })),

  withProps(({ data }) => ({
    data: map(city => {
      const nodesForRemove = compose(
        map(prop("id")),
        values,
        filter(pathEq(["connections", "length"], 2))
      )(city.stops)
      return {
        ...city,
        graphData: prepareDataForGraphSpaceVisualization(removeNodeListFromGraph(nodesForRemove, city.stops))
      }
    }, data)
  })),
  withProps(({ data }) => ({
    extent: [
      min(map(city => min(city.graphData.nodes, path(["connections", "length"])), data)),
      max(map(city => max(city.graphData.nodes, path(["connections", "length"])), data))
    ]
  }))
)

export default enhancer(GraphVisualization)
