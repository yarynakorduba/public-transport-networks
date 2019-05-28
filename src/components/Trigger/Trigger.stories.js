import React from "react"
import { storiesOf } from "@storybook/react"
import { Trigger, TriggerContext } from "./Trigger"
import { assoc } from "ramda"

storiesOf("Trigger", module).add("Active", () => {
  return (
    <TriggerContext>
      <Trigger isActive={true} data={assoc({ name: "example" })}>
        Active Trigger
      </Trigger>
    </TriggerContext>
  )
})
