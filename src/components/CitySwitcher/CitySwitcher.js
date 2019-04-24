import React from "react"
import "./CitySwitcher.scss"
import BEM from "../../helpers/BEM"

const b = BEM("city-switcher")

const CitySwitcher = ({ data, switchCity, currentCity, changeDisplayedCities }) => (
  <form className={b()}>
    {data.map((item, i) => (
      <div key={i} className={b("city-checkbox")}>
        <input
          type={"checkbox"}
          key={i}
          checked={currentCity[i].active ? true : false}
          onChange={node => changeDisplayedCities(i, node.target.checked)}
        />
        <label className={b("city-label")}>{item}</label>
      </div>
    ))}
  </form>
)

export default CitySwitcher
