import * as d3 from "d3"

export const colorScale = d3
  .scaleThreshold()
  .domain([2, 5])
  .range(["white", "#f3dd6f", "#F3CC06"])

export const radiusScale = d3
  .scaleLinear()
  .domain([1, 10])
  .range([2, 11])
