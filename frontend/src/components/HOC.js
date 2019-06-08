import { renameProps, withProps, compose } from "recompose"
import { withParentSize } from "@vx/responsive"

export const withCalculatedChartSize = compose(
  withParentSize,
  renameProps({ parentHeight: "height", parentWidth: "width" }),
  withProps(({ width, height, margin }) => ({
    chartWidth: width - (margin.left + margin.right),
    chartHeight: height - (margin.top + margin.bottom)
  }))
)
