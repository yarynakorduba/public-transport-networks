import React from "react"
import ForceGraph from "./ForceGraph"
import { assoc, compose, filter, flip, map, prop, values, pathEq, path, isEmpty } from "ramda"
import { withProps, branch, renderComponent } from "recompose"
import { clustersDbscan } from "@turf/turf"
import { graphql } from "react-apollo"
import { gql } from "apollo-boost"
import { max, min } from "d3"
import labels from "../../uaLabelsForDataKeys"
import { prepareClusteredDataForGraphSpaceVisualization } from "./helpers"
import {
  arrayToObject,
  convertBusStopsDataToGeoJSON,
  convertBusStopsGeoJSONToJson,
  mapIndexed,
  removeNodeListFromGraph
} from "../../helpers"
import BEM from "../../helpers/BEM"
import "./GraphVisualization.scss"
import Loader from "../Loader/Loader"

const b = BEM("GraphVisualization")

const CLUSTERIZATION_RADIUS_IN_KM = 0.04

const getCitiesStopsQuery = graphql(
  gql`
    query Cities {
      cities {
        _id
        stops {
          id
          stationType
          lat
          lon
          connections
        }
        stationTypes
      }
    }
  `
)

export const clusterizeDataForGraphSpaceVisualization = data =>
  compose(
    convertBusStopsGeoJSONToJson,
    data => clustersDbscan(data, CLUSTERIZATION_RADIUS_IN_KM, { mutate: true, minPoints: 2 }),
    convertBusStopsDataToGeoJSON
  )(data)

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
  getCitiesStopsQuery,
  branch(({ data }) => data.loading, renderComponent(() => <Loader loading={true} />)),
  branch(({ data }) => data.error, renderComponent(() => <Loader loading={false} />)),
  withProps(({ data }) => ({ data: filter(n => !isEmpty(n.stops), data.cities) })),
  withProps(({ data }) => ({
    data: map(
      city => ({
        ...city,
        label: labels[city["_id"]],
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
        graphData: prepareClusteredDataForGraphSpaceVisualization(removeNodeListFromGraph(nodesForRemove, city.stops))
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
