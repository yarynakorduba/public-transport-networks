import React from "react"
import DataTable from "../CitiesInfoTable"
import RadarChart from "../RadarChart"
import CitySwitcher from "../CitySwitcher"
import Loader from "../Loader"
import { compose, withStateHandlers, branch, renderComponent, withProps } from "recompose"
import { mapObjIndexed, indexBy, prop, pick, union, keys, filter } from "ramda"
import { graphql } from "react-apollo"
import { gql } from "apollo-boost"

import BEM from "../../helpers/BEM"
import "./CitiesInfoBlock.scss"

const b = BEM("CitiesInfoBlock")

const CITIES_COLORS = { lviv: "#E62139", bristol: "#035B82" }

const getCitiesPropsQuery = graphql(
  gql`
    query Cities {
      cities {
        _id
        stationTypes
        stopsNumber
        routesNumber
        squareKm
        population
        averageStopsOnRoute
      }
    }
  `
)

const CitiesInfoBlock = ({ citiesData, displayedCities, numericData, changeDisplayedCities, allCities }) => (
  <div className={b()}>
    <DataTable data={numericData} colors={CITIES_COLORS} />
    <CitySwitcher
      displayedCities={displayedCities}
      allCities={allCities}
      changeDisplayedCities={changeDisplayedCities}
      colors={CITIES_COLORS}
    />
    <RadarChart data={numericData} colors={CITIES_COLORS} displayedCities={displayedCities} />
  </div>
)

export default compose(
  getCitiesPropsQuery,
  branch(({ data }) => data.loading, renderComponent(() => <Loader loading={true} />)),
  branch(({ data }) => data.error, renderComponent(() => <Loader loading={false} />)),
  withProps(({ data }) => ({
    citiesData: data.cities && indexBy(prop("_id"), data.cities)
  })),
  withStateHandlers(
    ({ citiesData }) => ({
      allCities: keys(citiesData),
      displayedCities: keys(citiesData),
      citiesData
    }),
    {
      changeDisplayedCities: ({ displayedCities }) => (cityName, isChecked) => ({
        displayedCities: isChecked ? union(displayedCities, [cityName]) : filter(n => n !== cityName, displayedCities)
      })
    }
  ),
  withProps(({ citiesData }) => ({
    numericData: mapObjIndexed(
      city => pick(["stopsNumber", "routesNumber", "squareKm", "population", "averageStopsOnRoute"], city),
      citiesData
    )
  }))
)(CitiesInfoBlock)
