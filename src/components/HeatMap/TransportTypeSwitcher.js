import { compose, includes, map } from "ramda"
import { withHandlers, withProps } from "recompose"
import React from "react"
import BEM from "../../helpers/BEM"
import "./TransportTypeSwitcher.scss"

const b = BEM("TransportTypeSwitcher")

const TransportTypeSwitcher = ({ handleChange, selectedTransportTypes, stationTypes }) => (
  <form className={b()}>
    {map(
      label => (
        <label key={label} className={b("transportType")}>
          <input
            type={"checkbox"}
            name={label}
            onChange={ev => handleChange(ev)}
            checked={includes(label, selectedTransportTypes)}
          />
          {label}
        </label>
      ),
      stationTypes
    )}
  </form>
)

const enhancer = compose(
  withProps(({ city, stationTypes }) => ({ city, labels: stationTypes })),
  withHandlers({
    handleChange: ({ handleSelect }) => ({ target }) => handleSelect(target.name, target.checked)
  })
)

export default enhancer(TransportTypeSwitcher)
