import React, { createContext, useEffect, useContext, useRef, useState } from "react"

import "./Trigger.scss"
import BEM from "../../helpers/BEM"
import { pipe, identity, equals } from "ramda"
const b = BEM("Trigger")

const ScrolledContext = createContext()

let scrolledData = []
const registerTriggers = (position, action) => {
  scrolledData.push([position, action])
}

export const TriggerContext = ({ children, ...props }) => {
  const rootEl = useRef()
  const [enhancedProps, enhanceProps] = useState({})

  useEffect(() => {
    let prevProps = enhancedProps //TODO: find better solution
    const onWindowScroll = () => {
      const scrolled = Math.abs(rootEl.current.getBoundingClientRect().top)

      const nextProps = pipe(
        ...scrolledData
          .sort(([a], [b]) => a > b)
          .filter(([scroll]) => scroll <= scrolled)
          .map(([, action]) => action),
        identity
      )(props)

      if (!equals(prevProps, nextProps)) {
        prevProps = nextProps
        enhanceProps(nextProps)
      }
    }
    window.addEventListener("scroll", onWindowScroll)

    return () => window.removeEventListener("scroll", onWindowScroll)
  }, [])

  return (
    <div ref={rootEl} style={{ height: "100%", width: "100%" }}>
      <div style={{ position: "fixed", top: 20, left: 20 }}>{JSON.stringify(enhancedProps)}</div>
      <ScrolledContext.Provider value={registerTriggers}>{children}</ScrolledContext.Provider>
    </div>
  )
}

const SCROLL_TOP_OFFSET = 200
export const Trigger = ({ children, action }) => {
  const registerTrigger = useContext(ScrolledContext)
  const rootEl = useRef(null)

  useEffect(() => {
    const position = rootEl.current.offsetTop
    registerTrigger(position, action)
  }, [])

  return (
    <span ref={rootEl} className={b()}>
      {children}
    </span>
  )
}

export default Trigger
