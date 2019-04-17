import React from "react"
import compose from "ramda/es/compose"
import { connect } from 'react-redux';
import { switchCity } from "../../actions"
import "./CitySwitcher.scss"
import BEM from "../../helpers/BEM"

const b = BEM("city-switcher")

const CitySwitcher = ({data, switchCity, currentCity}) => (
  <form className={b()}>
    {data.map((item,i)=>(
          <div className={b("city-checkbox")}>
          <input type={'checkbox'} key={i} onClick={node=>{switchCity(i,node.target.checked)}} checked={currentCity[i].active?true:false}/><label className={b('city-label')}>{item}</label>
          </div>
        )
    )}
  </form>
)

export default compose(
  connect(state => ({ currentCity: state.currentCity }), {switchCity:switchCity}),
)(CitySwitcher)