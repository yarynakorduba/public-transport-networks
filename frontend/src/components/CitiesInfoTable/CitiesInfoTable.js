import React from "react"
import { compose, withProps } from "recompose"
import { head, keys, map, values } from "ramda"
import { format } from "d3"
import labels from "../../uaLabelsForDataKeys"
import BEM from "../../helpers/BEM"
import "./CitiesInfoTable.scss"

const b = BEM("CitiesInfoTable")

const CitiesInfoTable = ({ data, cityNames, cityPropertiesKeys, colors }) => (
  <table className={b()}>
    <tbody>
      <tr>
        <th className={b("row-title")}>Місто</th>
        {map(
          city => (
            <td className={b("row-title", ["align-right"])} key={city} style={{ color: colors[city] }}>
              {labels[city]}
            </td>
          ),
          cityNames
        )}
      </tr>
      {map(
        property => (
          <tr key={property}>
            <th className={b("row-property")}>{labels[property]}</th>
            {map(
              city => (
                <td key={city} className={b("row-value")}>
                  {format(",")(data[city][property])}
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
  withProps(({ data }) => ({
    cityNames: keys(data),
    cityPropertiesKeys: compose(
      keys,
      head,
      values
    )(data)
  }))
)

export default enhancer(CitiesInfoTable)
