import React from "react"
import BEM from "../../helpers/BEM"
import "./Note.scss"

const b = BEM("Note")

const Note = ({ noteText, children }) => (
  <span className={b()}>
    <span className={b("noted-element")}>
      {children}
      <span className={b("anchor")}>*</span>
    </span>
    <span className={b("text")}>{noteText}</span>
  </span>
)

export default Note
