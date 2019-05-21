import { gql } from "apollo-boost"

export const getStopsQuery = gql`
  query Stops($city: String!) {
    stops(city: $city) {
      id
      lat
      lon
      routes
      stationType
      connections
    }
    stationTypes(city: $city)
  }
`

export const getStationTypesQuery = gql`
  query StationTypes($city: String!) {
    stationTypes(city: $city)
  }
`
