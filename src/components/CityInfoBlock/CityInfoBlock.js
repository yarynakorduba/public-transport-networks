import React from "react"
import DataTable from "../DataTable/DataTable"
import RadarChart from "../RadarChart/RadarChart"
import CitySwitcher from "../CitySwitcher/CitySwitcher"
import { compose } from "recompose"
import { ajax } from "rxjs/ajax/index"
import { branch, mapPropsStream, renderComponent, withProps } from "recompose"
import { combineLatest } from "rxjs/index"
import { map } from "rxjs/operators/index"
import { connect } from "react-redux"

const CityInfoBlock = ({ radarData, tableData, cityColor, cities }) => (
  <>
    <DataTable data={tableData} cities={cities} cityColor={cityColor} />
    <RadarChart color={cityColor} data={radarData} />
    <CitySwitcher data={cities} />
  </>
)

export default compose(
  // TODO: change to selector
  connect(state => ({ currentCity: state.currentCity })),
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
    for (var key in data) {
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
