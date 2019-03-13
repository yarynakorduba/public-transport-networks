import React from "react"
import { storiesOf } from "@storybook/react"
import { SpaceGraphWithDrawing } from "./SpaceGraph"
import data from "../../reducers/data"
import configureStore from "../../configureStore"
import { Provider } from "react-redux"
const mockData = {
  "1": {
    id: "1",
    label: "1",
    connections: ["2"],
    lat: "362379",
    lon: "180909",
    index: 0
  },
  "2": {
    id: "2",
    label: "2",
    connections: ["1", "3"],
    lat: "362379",
    lon: "180909",
    index: 1
  },
  "3": {
    id: "3",
    label: "3",
    connections: ["2", "4", "6", "7"],
    lat: "362379",
    lon: "180909",
    index: 2
  },
  "4": {
    id: "4",
    label: "4",
    connections: ["3", "5"],
    lat: "362379",
    lon: "180909",
    index: 3
  },
  "5": {
    id: "5",
    label: "5",
    connections: ["4"],
    lat: "362379",
    lon: "180909",
    index: 4
  },
  "6": {
    id: "6",
    label: "K",
    connections: ["3"],
    lat: "362379",
    lon: "180909",
    index: 5
  },
  "7": {
    id: "7",
    label: "L",
    connections: ["3", "8"],
    lat: "362379",
    lon: "180909",
    index: 6
  },
  "8": {
    id: "8",
    label: "M",
    connections: ["7", "9"],
    lat: "362379",
    lon: "180909",
    index: 7
  },
  "9": {
    id: "9",
    label: "N",
    connections: ["8"],
    lat: "362379",
    lon: "180909",
    index: 8
  }
}

storiesOf("SpaceGraph", module)
  .add("Simple Graph", () => {
    return (
      <Provider store={configureStore(data)}>
        <SpaceGraphWithDrawing
          chartWidth={300}
          chartHeight={200}
          data={mockData}
          space={"c"}
          representationOf={"bristol"}
        />
      </Provider>
    )
  })
  .add("Labeled Graph", () => {
    return (
      <Provider store={configureStore(data)}>
        <SpaceGraphWithDrawing
          chartWidth={300}
          chartHeight={200}
          data={mockData}
          showLabels={true}
          space={"c"}
          representationOf={"bristol"}
        />
      </Provider>
    )
  })
