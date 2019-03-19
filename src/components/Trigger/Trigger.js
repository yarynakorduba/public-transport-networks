import React, { createContext, useEffect, useContext, useRef, useState } from "react"

import "./Trigger.scss"
import BEM from "../../helpers/BEM"
import { pipe, identity, equals } from "ramda"
const b = BEM("Trigger")

export const ScrolledContext = createContext()

let scrolledData = []
const registerTriggers = (position:number, action:function) => {
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
      <ScrolledContext.Provider value={{ registerTriggers, scrolledProgress: enhancedProps }}>
        {children}
      </ScrolledContext.Provider>
    </div>
  )
}

const SCROLL_TOP_OFFSET = 200
export const Trigger = ({ children, action }) => {
  const { registerTriggers: registerTrigger } = useContext(ScrolledContext)
  const rootEl = useRef(null)
  useEffect(() => {
    const position = rootEl.current.offsetTop - SCROLL_TOP_OFFSET
    registerTrigger(position, action)
  }, [])

  //TODO: find adequate solution for trigger highlighting
  return (
    <span ref={rootEl} className={b()}>
      {children}
    </span>
  )
}

export default Trigger
