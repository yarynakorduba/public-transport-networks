import React from "react"
import DataTable from "../DataTable/DataTable"
import RadarChart from "../RadarChart/RadarChart"
import CitySwitcher from "../CitySwitcher/CitySwitcher"
import {compose} from "recompose"
import { ajax } from "rxjs/ajax/index"
import { branch, mapPropsStream, renderComponent, withProps } from "recompose"
import { combineLatest } from "rxjs/index"
import { map } from "rxjs/operators/index"
import { connect } from "react-redux"

const CityInfoBlock = ({radarData, tableData, cityColor, cities}) => {
  return (
    <>
      <DataTable data={tableData} cities={cities} cityColor={cityColor}/>
      <RadarChart color={cityColor} data={radarData}/>
      <CitySwitcher data={cities}/>
    </>
  )
}

export default compose(
  connect(state=>({currentCity:state.currentCity})),
  mapPropsStream(props$ => {
    const data$ = ajax.getJSON("/data/citiesMainCharacteristicsForRadarChart.json")
    const tableData$ = ajax.getJSON("/data/citiesMainCharacteristics.json")
    return combineLatest(props$, data$, tableData$).pipe(map(([props, data, tableData]) => ({ ...props, data, tableData })))
  }),
  branch(({ data }) => !data, renderComponent(() => "Loading the data...")),
  withProps(({data, currentCity, tableData}) => {

    let cities=[];
    let radarData

    let counter=0
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if(counter == currentCity){
          radarData = data[key]
        }
        cities.push(key);
      }
      counter++
    }

    return {
      radarData: radarData.data,
      tableData: tableData,
      cityColor: radarData.color,
      cities: cities
    }
  })
)(CityInfoBlock)