import { compose, map } from "ramda"
import { withHandlers } from "recompose"
import React from "react"
import labels from "../../uaLabelsForDataKeys"
import BEM from "../../helpers/BEM"
import "./TransportTypeSwitcher.scss"

const b = BEM("TransportTypeSwitcher")

const TransportTypeSwitcher = ({ handleChange, selectedTransportTypes, stationTypes, city }) => (
  <div className={b()}>
    <span className={b("city")}>{labels[city]}</span>
    <form className={b("transportTypes")}>
      {map(
        stationType => (
          <label key={stationType} className={b("transportType")}>
            <input
              type={"checkbox"}
              name={stationType}
              onChange={ev => handleChange(ev)}
              checked={selectedTransportTypes.includes(stationType)}
            />
            {labels[stationType]}
          </label>
        ),
        stationTypes
      )}
    </form>
  </div>
)

const enhancer = compose(
  withHandlers({
    handleChange: ({ handleSelect }) => ({ target }) => handleSelect(target.name, target.checked)
  })
)

export default enhancer(TransportTypeSwitcher)
