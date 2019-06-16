import { compose } from "ramda"
import { lifecycle, withStateHandlers } from "recompose"
import React, { useEffect } from "react"
import Contents from "../Contents/Contents"

import BEM from "../../../helpers/BEM.js"
import "./ContentsThumbnail.scss"

const b = BEM("ContentsThumbnail")

const ContentsThumbnail = ({ hidden, onClickHideThumbnail, hideThumbnail, addListener, incrementListener }) => {
  useEffect(() => {
    if (addListener === 0) {
      incrementListener()
      document.addEventListener("click", event => {
        if (!event.target.closest(".Contents") && !event.target.closest(".ContentsThumbnail__button")) {
          hideThumbnail()
        }
      })
    }
  })

  return (
    <div className={hidden ? b(["hidden"]) : b(["unhidden"])}>
      <button onClick={onClickHideThumbnail} className={b("button")}>
        <img className={b("icon")} src={"img/management/contents.svg"} alt={"Contents Icon"} />
      </button>
      <Contents contentsModifier={"hide-right"} />
    </div>
  )
}

export default compose(
  withStateHandlers(() => ({ hidden: true, addListener: 0 }), {
    onClickHideThumbnail: ({ hidden }) => () => ({ hidden: !hidden }),
    hideThumbnail: () => () => ({ hidden: true }),
    incrementListener: ({ addListener }) => () => ({ addListener: addListener + 1 })
  })
)(ContentsThumbnail)
