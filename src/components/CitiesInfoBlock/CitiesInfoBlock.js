import React from "react"
import DataTable from "../CitiesInfoTable"
import RadarChart from "../RadarChart"
import CitySwitcher from "../CitySwitcher"
import { compose, withStateHandlers, branch, mapPropsStream, renderComponent } from "recompose"
import { ajax } from "rxjs/ajax/index"
import { combineLatest } from "rxjs/index"
import { map } from "rxjs/operators"
import { mapObjIndexed } from "ramda"

const CitiesInfoBlock = ({ data, changeDisplayedCities }) => (
  <>
    <DataTable data={data} />
    <RadarChart data={data} />
    <CitySwitcher data={data} changeDisplayedCities={changeDisplayedCities} />
  </>
)

// TODO: check whether it is right to do that with state and props
export default compose(
  mapPropsStream(props$ =>
    combineLatest(props$, ajax.getJSON("/data/cities.json")).pipe(map(([props, data]) => ({ ...props, data })))
  ),
  branch(({ data }) => !data, renderComponent(() => "Loading the data...")),
  //TODO: change this part
  withStateHandlers(
    ({ data }) => ({
      data
    }),
    {
      changeDisplayedCities: ({ data }) => (cityName, isChecked) => ({
        data: mapObjIndexed((city, cityKey) => (cityKey === cityName ? { ...city, active: isChecked } : city))(data)
      })
    }
  )
)(CitiesInfoBlock)
