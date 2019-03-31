import React from "react"
import { compose, withProps } from "recompose"

import "./DataTable.scss"
import BEM from "../../helpers/BEM"

import data from "../../table_testik"

const b = BEM("data-table")


const DataTable = ({ drawChart }) => {
  return drawChart()
}

export default compose(
  withProps(({
      drawChart: () => {
        return (
          <table className={b()}>
            <tbody>
            <tr>
              <th className={b("row-title")}>City</th>
              <td className={b("row-title")}>Lviv</td>
              <td className={b("row-title")}>Bristol</td>
              <td className={b("row-title")}>London</td>
            </tr>
            {data.map((item,i)=>(
              <tr key={i}>
                <th className={b("row-property")}>{item.property}</th>
                <td className={b("row-value")}>{item.lviv}</td>
                <td className={b("row-value")}>{item.bristol}</td>
                <td className={b("row-value")}>{item.london}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )
      }
    })
  ))(DataTable)