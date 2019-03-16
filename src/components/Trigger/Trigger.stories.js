import React from "react"
import { storiesOf } from "@storybook/react"
import { Trigger } from "./Trigger"

storiesOf("Trigger", module)
  .add("Inactive", () => {
    return <Trigger data={{ name: "example" }}>Inactive Trigger</Trigger>
  })
  .add("Active", () => {
    return (
      <Trigger isActive={true} data={{ name: "example" }}>
        Active Trigger
      </Trigger>
    )
  })
