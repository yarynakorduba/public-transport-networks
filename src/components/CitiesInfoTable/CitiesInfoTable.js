import React from "react"
import { compose, mapProps } from "recompose"
import { keys, values } from "ramda"

import BEM from "../../helpers/BEM"
import "./CitiesInfoTable.scss"

const b = BEM("CitiesInfoTable")

const CitiesInfoTable = ({ data, cityNames, cityProperties }) => (
  <table className={b()}>
    <tbody>
      <tr>
        <th className={b("row-title")}>City</th>
        {cityNames.map((cityName, i) => (
          <td className={b("row-title", ["align-right"])} key={i} style={{ color: data[cityName].color }}>
            {cityName}
          </td>
        ))}
      </tr>
      {cityProperties.map((property, i) => (
        <tr key={i}>
          <th className={b("row-property")}>{property}</th>
          {cityNames.map((city, cityInd) => (
            <td key={cityInd} className={b("row-value")}>
              {data[city].data[i].value}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

const enhancer = compose(
  mapProps(({ data }) => ({
    data,
    cityNames: keys(data),
    cityProperties: values(data)[0].data.map(propertyInfo => propertyInfo.property)
  }))
)

export default enhancer(CitiesInfoTable)
