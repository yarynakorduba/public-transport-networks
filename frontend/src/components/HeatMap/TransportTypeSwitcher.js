import { without, append } from "ramda"
import React from "react"
import labels from "../../uaLabelsForDataKeys"
import BEM from "../../helpers/BEM"
import "./TransportTypeSwitcher.scss"

const b = BEM("TransportTypeSwitcher")

const TransportTypeSwitcher = ({
  selectedTransportTypes,
  stationTypes: transportTypes,
  city,
  handleSelect = () => {}
}) => {
  const handleChange = ({ target: { name: triggeredStation, checked } }) =>
    handleSelect(
      checked ? append(triggeredStation, selectedTransportTypes) : without([triggeredStation], selectedTransportTypes)
    )

  return (
    <div className={b()}>
      <span className={b("city")}>{labels[city]}</span>
      <form className={b("transportTypes")}>
        {transportTypes.map(stationType => (
          <label key={stationType} className={b("transportType")}>
            <input
              type={"checkbox"}
              name={stationType}
              onChange={ev => handleChange(ev)}
              checked={selectedTransportTypes.includes(stationType)}
            />
            {labels[stationType]}
          </label>
        ))}
      </form>
    </div>
  )
}

export default TransportTypeSwitcher
