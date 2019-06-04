import { compose, equals, mapObjIndexed } from "ramda"
import { lifecycle, withStateHandlers } from "recompose"
import React, { useEffect } from "react"
import Contents from "../Contents/Contents"

import BEM from "../../../helpers/BEM.js"
import "./ContentsThumbnail.scss"

const b = BEM("ContentsThumbnail")

const ContentsThumbnail = ({ hidden, onClick, addListener, incrementListener }) => {
  useEffect(()=>{
    if(addListener == 0){
      console.log("asdasd")
      incrementListener()
      document.addEventListener("click" , function(event) {
        if(!event.target.closest(".ContentsThumbnail")){
          onClick()
        }
      })
    }
  })

  return (
    <div className={ hidden ? b(["hidden"]) : b(["unhidden"])}>
      <button onClick={onClick} className={b("button")}>
        <img className={b("icon")} src={"img/management/contents.svg"}/>
      </button>
      <Contents contentsModifier={"hide-right"}/>
    </div>
  )
}

export default compose(
  withStateHandlers(
    () => ({hidden: true, addListener:0}), {
      onClick: ({hidden}) => () => ({hidden: !hidden}),
      incrementListener: ({addListener}) => () => ({addListener: addListener + 1})
    }
  ),
  lifecycle({
    componentDidMount() {

    }
  })
  )(ContentsThumbnail)