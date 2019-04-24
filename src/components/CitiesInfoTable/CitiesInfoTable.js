import React from "react"
import "./DataTable.scss"
import BEM from "../../helpers/BEM"
import { compose, mapProps } from "recompose"
import { keys, values } from "ramda"

const b = BEM("data-table")

const DataTable = ({ data, cityNames }) => (
  <table className={b()}>
    <tbody>
      <tr>
        <th className={b("row-title")}>City</th>
        {cityNames.map((item, i) => (
          <td className={b("row-title")} key={i} style={{ color: data[item].color }}>
            {item}
          </td>
        ))}
      </tr>
      {Object.values(data)[0].data.map((item, i) => (
        <tr key={i}>
          <th className={b("row-property")}>{item.property}</th>
          {Object.values(data).map((city, i) => (
            <td key={i} className={b("row-value")}>
              {city.data[i].value}
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
    cityProperties: values(data)[0].data
  }))
)

export default enhancer(DataTable)
