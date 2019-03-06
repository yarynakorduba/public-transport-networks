import * as d3 from "d3"

export const colorScale = (domain = [2, 3], range = ["white", "#F3CC06", "#B83C3D"]) =>
  d3
    .scaleThreshold()
    .domain(domain)
    .range(range)

export const radiusGraphScale = domain =>
  d3
    .scaleLinear()
    .domain(domain)
    .range([2, 10])
