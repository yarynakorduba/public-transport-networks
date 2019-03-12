import React from "react"
import { storiesOf } from "@storybook/react"
import SpaceGraph from "./SpaceGraph"
import configureStore from "../../configureStore"
import data from "../../reducers/data"

import { Provider } from "react-redux"

const store = configureStore(data)

const mockData = [
  { id: "1", label: "1", connections: ["2"], lat: "362379", lon: "180909" },
  { id: "2", label: "2", connections: ["1", "3"], lat: "362379", lon: "180909" },
  { id: "3", label: "3", connections: ["2", "4", "6", "7"], lat: "362379", lon: "180909" },
  { id: "4", label: "4", connections: ["3", "5"], lat: "362379", lon: "180909" },
  { id: "5", label: "5", connections: ["4"], lat: "362379", lon: "180909" },
  { id: "6", label: "K", connections: ["3"], lat: "362379", lon: "180909" },
  { id: "7", label: "L", connections: ["3", "8"], lat: "362379", lon: "180909" },
  { id: "8", label: "M", connections: ["7", "9"], lat: "362379", lon: "180909" },
  { id: "9", label: "N", connections: ["8"], lat: "362379", lon: "180909" }
]

storiesOf("SpaceGraph", module).add("Simple usage", () => {
  return (
    <Provider store={store}>
      <SpaceGraph
        data={mockData}
        space={"c"}
        representationOf={"bristol"}
        classNameOfVisualizationContainer={".LSpaceGraph"}
      />
    </Provider>
  )
})
