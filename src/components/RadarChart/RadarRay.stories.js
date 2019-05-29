import React from "react"
import { storiesOf } from "@storybook/react"
import { RadarRay } from "./RadarRay"
import { Group } from "@vx/group"

storiesOf("RadarRay", module)
  .add("Default", () => {
    return (
      <svg>
        <Group width={300} height={300}>
          <RadarRay targetPoint={{ x: 100, y: 100 }} />
        </Group>
      </svg>
    )
  })
  .add("With label", () => {
    return (
      <svg>
        <Group width={300} height={300}>
          <RadarRay rayLabel={"Ray Label"} targetPoint={{ x: 100, y: 100 }} />
        </Group>
      </svg>
    )
  })
