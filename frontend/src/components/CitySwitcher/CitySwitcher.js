import React from "react"
import "./CitySwitcher.scss"
import BEM from "../../helpers/BEM"
import { withHandlers } from "recompose"
import { map, compose } from "ramda"

const b = BEM("CitySwitcher")

export const CitySwitcher = ({ handleChange, displayedCities, allCities, labels, colors }) => (
  <form className={b()}>
    {map(
      city => (
        <label key={city} className={b("city-checkbox")} style={{ color: colors[city] }}>
          <input type={"checkbox"} defaultChecked onChange={ev => handleChange(ev, city)} />
          {labels[city]}
        </label>
      ),
      allCities
    )}
  </form>
)

const enhancer = compose(
  withHandlers({
    handleChange: ({ changeDisplayedCities }) => (ev, city) => {
      changeDisplayedCities(city, ev.target.checked)
    }
  })
)

export default enhancer(CitySwitcher)
