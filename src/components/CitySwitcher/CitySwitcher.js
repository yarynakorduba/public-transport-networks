import React from "react"
import "./CitySwitcher.scss"
import BEM from "../../helpers/BEM"
import { withHandlers, withProps } from "recompose"
import { keys, map, compose, mapObjIndexed } from "ramda"

const b = BEM("CitySwitcher")

export const CitySwitcher = ({ handleChange, data }) => (
  <form className={b()}>
    {map(
      city => (
        <label key={city} className={b("city-checkbox")} style={{ color: data[city].color }}>
          <input
            type={"checkbox"}
            checked={data[city].active}
            onChange={ev => handleChange && handleChange(ev, city)}
          />
          {data[city]["cityLabel"]}
        </label>
      ),
      keys(data)
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
