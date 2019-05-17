import React from "react"
import DataTable from "../CitiesInfoTable"
import RadarChart from "../RadarChart"
import CitySwitcher from "../CitySwitcher"
import { compose, withStateHandlers, branch, mapPropsStream, renderComponent } from "recompose"
import { ajax } from "rxjs/ajax"
import { combineLatest } from "rxjs"
import { map } from "rxjs/operators"
import { mapObjIndexed, equals } from "ramda"
import BEM from "../../helpers/BEM"
import "./CitiesInfoBlock.scss"

const b = BEM("CitiesInfoBlock")

const CitiesInfoBlock = ({ data, changeDisplayedCities }) => (
  <div className={b()}>
    <DataTable data={data} />
    <CitySwitcher data={data} changeDisplayedCities={changeDisplayedCities} />
    <RadarChart data={data} />
  </div>
)

export default compose(
  mapPropsStream(props$ =>
    combineLatest(props$, ajax.getJSON("/data/cities.json")).pipe(map(([props, data]) => ({ ...props, data })))
  ),
  branch(({ data }) => !data, renderComponent(() => "Loading the data...")),
  withStateHandlers(
    ({ data }) => ({
      data: mapObjIndexed(city => ({ ...city, active: true }))(data)
    }),
    {
      changeDisplayedCities: ({ data }) => (cityName, isChecked) => ({
        data: mapObjIndexed((city, cityKey) => (equals(cityKey, cityName) ? { ...city, active: isChecked } : city))(
          data
        )
      })
    }
  )
)(CitiesInfoBlock)
