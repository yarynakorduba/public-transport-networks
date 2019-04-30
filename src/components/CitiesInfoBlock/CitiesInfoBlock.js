import React from "react"
import DataTable from "../CitiesInfoTable/index"
import RadarChart from "../RadarChart/index"
import CitySwitcher from "../CitySwitcher/index"
import { compose, withStateHandlers, branch, mapPropsStream, renderComponent } from "recompose"
import { ajax } from "rxjs/ajax/index"
import { combineLatest } from "rxjs/index"
import { map } from "rxjs/operators"
import { mapObjIndexed } from "ramda"

const CityInfoBlock = ({ data, changeDisplayedCities }) => (
  <>
    <DataTable data={data} />
    <RadarChart data={data} />
    <CitySwitcher data={data} changeDisplayedCities={changeDisplayedCities} />
  </>
)

// TODO: check whether it is right to do that with state and props
export default compose(
  mapPropsStream(props$ => {
    const data$ = ajax.getJSON("/data/cities.json")
    return combineLatest(props$, data$).pipe(map(([props, data]) => ({ ...props, data })))
  }),

  branch(({ data }) => !data, renderComponent(() => "Loading the data...")),
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
)(CityInfoBlock)
