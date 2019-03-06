import React from "react"
import { storiesOf } from "@storybook/react"
import { Illustration } from "./Illustration"

storiesOf("Illustration", module).add("Simple usage", () => {
  return (
    <>
      <h3>
        Hello. This is my Illustration component. It is not finished yet. ±Byt I promise I'll do it until next lesson.
        (Otherwise I'll be punished.)
      </h3>
      <Illustration />
    </>
  )
})
