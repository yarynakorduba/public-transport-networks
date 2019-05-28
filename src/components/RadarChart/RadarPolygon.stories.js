import React from "react"
import { storiesOf } from "@storybook/react"
import { Group } from "@vx/group"
import { RadarPolygon } from "./RadarPolygon"

storiesOf("RadarPolygon", module)
  .addDecorator(story => (
    <svg>
      <Group width={400} height={400}>
        {story()}
      </Group>
    </svg>
  ))
  .add("Default", () => <RadarPolygon polygonPoints={"10,10 100,10 100,100 10,100"} />)
  .add("With color", () => <RadarPolygon color={"green"} polygonPoints={"10,10 100,10 100,100 10,100"} />)
  .add("With line", () => <RadarPolygon polygonPoints={"10,10 100,100"} />)
