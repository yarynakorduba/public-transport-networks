import { compose } from "ramda"
import { connect } from "react-redux"
import { getTriggers } from "../../reducers/index"
import { withRouter } from "react-router-dom"
import { withProps } from "recompose"

export const triggerRespondent = compose( // = (config) => compose()
  withRouter,
  connect(state => ({
    triggers: getTriggers(state)
  })),
  withProps(({ history, triggers, location }) =>
    triggers && triggers.name && triggers.space
      ? location.pathname !== `/cities/${triggers.name.toLowerCase()}/spaces/${triggers.space.toLowerCase()}` &&
        history.push(`/cities/${triggers.name.toLowerCase()}/spaces/${triggers.space.toLowerCase()}`)
      : location.pathname !== `/` && history.push(`/`)
  )
)
