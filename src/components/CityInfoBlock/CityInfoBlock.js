import React from "react"
import DataTable from "../DataTable/DataTable"
import RadarChart from "../RadarChart/RadarChart"
import CitySwitcher from "../CitySwitcher/CitySwitcher"
import { compose, withStateHandlers } from "recompose"
import { ajax } from "rxjs/ajax/index"
import { branch, mapPropsStream, renderComponent, withProps } from "recompose"
import { combineLatest } from "rxjs/index"
import { map } from "rxjs/operators/index"

const CityInfoBlock = ({ radarData, tableData, cityColor, cities, changeDisplayedCities, currentCity }) => (
  <>
    <DataTable data={tableData} cities={cities} cityColor={cityColor} currentCity={currentCity} />
    <RadarChart color={cityColor} data={radarData} currentCity={currentCity} />
    <CitySwitcher data={cities} currentCity={currentCity} changeDisplayedCities={changeDisplayedCities} />
  </>
)

export default compose(
  withStateHandlers(
    () => ({
      currentCity: [{ index: 0, active: 1 }, { index: 1, active: 0 }, { index: 2, active: 0 }]
    }),
    {
      changeDisplayedCities: ({ currentCity }) => (cityIndex, isChecked) => ({
        currentCity: currentCity.map(city => (city.index === cityIndex ? { ...city, active: isChecked } : city))
      })
    }
  ),
  mapPropsStream(props$ => {
    const data$ = ajax.getJSON("/data/mainCitiesIndicatorsRadarData.json")
    const tableData$ = ajax.getJSON("/data/mainCitiesIndicators.json")
    return combineLatest(props$, data$, tableData$).pipe(
      map(([props, data, tableData]) => ({ ...props, data, tableData }))
    )
  }),
  branch(({ data }) => !data, renderComponent(() => "Loading the data...")),
  withProps(({ data, tableData }) => {
    let cities = []
    let radarData = []
    let cityColor = []

    let counter = 0
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        radarData.push(data[key].data)
        cityColor.push(data[key].color)
        cities.push(key)
      }
      counter++
    }

    return {
      radarData: radarData,
      tableData: tableData,
      cityColor: cityColor,
      cities: cities
    }
  })
)(CityInfoBlock)
