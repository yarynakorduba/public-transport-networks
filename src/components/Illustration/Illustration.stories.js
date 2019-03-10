import React from "react"
import { storiesOf } from "@storybook/react"
import { Illustration } from "./Illustration"

storiesOf("Illustration", module).add("Simple usage", () => {
  return (
    <>
      <Illustration />
    </>
  )
})
