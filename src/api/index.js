import { gql } from "apollo-boost"
import { graphql } from "react-apollo"

export const getGraphSpaceData = (city: string, space: string): Promise<Array> =>
  fetch(
    `https://media.githubusercontent.com/media/yarynakorduba/public-transport-networks/master/public/data/${city}_${space}_space.json`
  )
    .then(response => response.json())
    .catch(e => console.error(e))

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

// ajax.getJSON("/data/cities.json")
// ajax.getJSON("/data/mainCitiesIndicators.json")
// json("/data/examplePathDistributionData.json")
// ajax.getJSON(`/data/${city}/${city}Stops.json`)
