import React from "react"
import { compose, withProps } from "recompose"
import { connect } from "react-redux"

import "./DataTable.scss"
import BEM from "../../helpers/BEM"

const b = BEM("data-table")


const DataTable = ({ data, cities, currentCity, cityColor }) => {
  return (
    <table className={b()}>
      <tbody>
      <tr>
        <th className={b("row-title")}>City</th>
        {cities.map((item,i)=>{
          console.log(i)
          return (
            <td className={b("row-title")} style={{color: currentCity==i?cityColor:"black"}}>{item}</td>
          )
        })}
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

export default compose(
  connect(state=>({currentCity:state.currentCity})),
)(DataTable)