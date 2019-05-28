import React from "react"
import { storiesOf } from "@storybook/react"
import { CitySwitcher } from "./CitySwitcher"

storiesOf("CitySwitcher", module)
  .add("Default", () => <CitySwitcher data={{ lviv: { cityLabel: "Львів" }, bristol: { cityLabel: "Брістоль" } }} />)
  .add("With handler", () => (
    <CitySwitcher
      handleChange={() => alert("Clicked!")}
      data={{ lviv: { cityLabel: "Львів" }, bristol: { cityLabel: "Брістоль" } }}
    />
  ))
  .add("With colored labels", () => (
    <CitySwitcher
      data={{ lviv: { cityLabel: "Львів", color: "green" }, bristol: { cityLabel: "Брістоль", color: "violet" } }}
    />
  ))
