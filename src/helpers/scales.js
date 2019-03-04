import * as d3 from "d3"

export const colorScale = d3
  .scaleThreshold()
  .domain([2, 3])
  .range(["white", "#F3CC06", "#B83C3D"])


export const radiusScale = d3
  .scaleLinear()
  .domain([1, 7])
  .range([5, 15])
