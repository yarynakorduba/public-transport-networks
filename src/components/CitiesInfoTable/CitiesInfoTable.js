import React from "react"
import { compose, mapProps } from "recompose"
import { head, keys, map, mapObjIndexed, prop, values } from "ramda"
import { format } from "d3"
import BEM from "../../helpers/BEM"
import "./CitiesInfoTable.scss"

const b = BEM("CitiesInfoTable")

const CitiesInfoTable = ({ data, cityNames, cityPropertiesKeys, cityPropertiesLabels }) => (
  <table className={b()}>
    <tbody>
      <tr>
        <th className={b("row-title")}>City</th>
        {map(
          city => (
            <td className={b("row-title", ["align-right"])} key={city} style={{ color: data[city].color }}>
              {city}
            </td>
          ),
          cityNames
        )}
      </tr>
      {map(
        property => (
          <tr key={property}>
            <th className={b("row-property")}>{cityPropertiesLabels[property]}</th>
            {map(
              city => (
                <td key={city} className={b("row-value")}>
                  {format(",")(data[city].data[property].propertyValue)}
                </td>
              ),
              cityNames
            )}
          </tr>
        ),
        cityPropertiesKeys
      )}
    </tbody>
  </table>
)

const enhancer = compose(
  mapProps(({ data }) => ({
    data,
    cityNames: keys(data),
    cityPropertiesLabels: compose(
      mapObjIndexed(prop("propertyLabel")),
      prop("data"),
      head,
      values
    )(data),
    cityPropertiesKeys: compose(
      keys,
      prop("data"),
      head,
      values
    )(data)
  }))
)

export default enhancer(CitiesInfoTable)
