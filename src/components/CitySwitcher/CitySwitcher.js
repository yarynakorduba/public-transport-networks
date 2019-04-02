import React from "react"
import compose from "ramda/es/compose"
import { connect } from 'react-redux';
import { switchCity } from "../../actions"
import "./CitySwitcher.scss"
import BEM from "../../helpers/BEM"

const b = BEM("city-switcher")

const CitySwitcher = ({data, switchCity}) => {
    return (
      <div className={b()}>
        {data.map((item,i)=>{
            return (
              <button className={b("button")} key={i} onClick={()=>{switchCity(i)}}>{item}</button>
            )
        })}
      </div>
    )
}

export default compose(
  connect(null, {switchCity:switchCity}),
)(CitySwitcher)