import React from "react"
import "./CitySwitcher.scss"
import BEM from "../../helpers/BEM"
import { withHandlers, withProps } from "recompose"
import { keys, map, compose } from "ramda"

const b = BEM("CitySwitcher")

const CitySwitcher = ({ cityKeys, handleChange, data }) => (
  <form className={b()}>
    {map(
      city => (
        <div key={city} className={b("city-checkbox")}>
          <input type={"checkbox"} checked={data[city].active} onChange={ev => handleChange(ev, city)} />
          <label className={b("city-label")} style={{ color: data[city].color }}>
            {data[city]["cityLabel"]}
          </label>
        </div>
      ),
      cityKeys
    )}
  </form>
)

const enhancer = compose(
  withProps(({ data }) => ({
    cityKeys: keys(data)
  })),
  withHandlers({
    handleChange: ({ changeDisplayedCities }) => (ev, city) => {
      changeDisplayedCities(city, ev.target.checked)
    }
  })
)

export default enhancer(CitySwitcher)
