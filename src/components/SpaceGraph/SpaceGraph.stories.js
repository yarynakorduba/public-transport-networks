import React from "react"
import { storiesOf } from "@storybook/react"
import SpaceGraph from "./SpaceGraph"

storiesOf("SpaceGraph", module).add("Simple usage", () => {
  return <SpaceGraph space={"c"} representationOf={"bristol"} classNameOfVisualizationContainer={".LSpaceGraph"} />
})
