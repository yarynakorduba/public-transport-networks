import React, {Component} from "react";
import { Graph } from '@vx/network';

class TransportGraph extends Component {
  constructor(props) {
    super(props);
    const {nodes, width, height} = props;

    const links = [
      { source: nodes[0], target: nodes[1] },
      { source: nodes[1], target: nodes[2] },
      { source: nodes[2], target: nodes[0] }
    ]

    this.state = {
      nodes: nodes,
      links: links,
      width: width,
      height: height,
    };
  }

  render() {
    const {nodes, links, width, height} = this.state

    this.graph = {
      nodes,
      links
    };

    return(
      <svg width={width} height={height}>
        <rect width={width} height={height} rx={14} fill="#272b4d" />
        <Graph graph={this.graph} />
      </svg>
    )

  }
}

export default TransportGraph;