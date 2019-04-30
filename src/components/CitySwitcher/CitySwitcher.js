import React from "react"
import "./CitySwitcher.scss"
import BEM from "../../helpers/BEM"
import { withProps } from "recompose"
import { keys } from "ramda"

const b = BEM("CitySwitcher")

const CitySwitcher = ({ cityNames, switchCity, changeDisplayedCities }) => (
  <form className={b()}>
    {cityNames.map((cityName, index) => (
      <div key={index} className={b("city-checkbox")}>
        <input type={"checkbox"} onChange={({ target: { checked } }) => changeDisplayedCities(cityName, checked)} />
        <label className={b("city-label")}>{cityName}</label>
      </div>
    ))}
  </form>
)

const enhancer = withProps(({ data }) => ({
  cityNames: keys(data)
}))

export default enhancer(CitySwitcher)
