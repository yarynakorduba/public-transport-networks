import React from "react"
import DataTable from "../CitiesInfoTable"
import RadarChart from "../RadarChart"
import CitySwitcher from "../CitySwitcher"
import { compose, withStateHandlers, branch, mapPropsStream, renderComponent } from "recompose"
import { ajax } from "rxjs/ajax"
import { combineLatest } from "rxjs"
import { map } from "rxjs/operators"
import { mapObjIndexed } from "ramda"
import BEM from "../../helpers/BEM"
import "./CitiesInfoBlock.scss"

const b = BEM("CitiesInfoBlock")

const CitiesInfoBlock = ({ data, changeDisplayedCities }) => (
  <div className={b()}>
    <DataTable data={data} />
    <RadarChart data={data} />
    <CitySwitcher data={data} changeDisplayedCities={changeDisplayedCities} />
  </div>
)

// TODO: check whether it is right to do that with state and props
export default compose(
  mapPropsStream(props$ =>
    //TODO: change dataset to the right values
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
