import { compose, map } from "ramda"
import { withHandlers, withProps } from "recompose"
import React from "react"
import BEM from "../../helpers/BEM"
import "./TransportTypeSwitcher.scss"

const b = BEM("TransportTypeSwitcher")

const TransportTypeSwitcher = ({ handleChange, selectedTransportTypes, stationTypes, city }) => (
  <div className={b()}>
    <span className={b("city")}>{city}</span>
    <form className={b("transportTypes")}>
      {map(
        label => (
          <label key={label} className={b("transportType")}>
            <input
              type={"checkbox"}
              name={label}
              onChange={ev => handleChange(ev)}
              checked={selectedTransportTypes.includes(label)}
            />
            {label}
          </label>
        ),
        stationTypes
      )}
    </form>
  </div>
)

const enhancer = compose(
  withProps(({ city, stationTypes }) => ({ city, labels: stationTypes })),
  withHandlers({
    handleChange: ({ handleSelect }) => ({ target }) => handleSelect(target.name, target.checked)
  })
)

export default enhancer(TransportTypeSwitcher)
