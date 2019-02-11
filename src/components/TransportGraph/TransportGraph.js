import React, {Component} from "react";
import { Graph } from '@vx/network';

class TransportGraph extends Component {
  constructor(props) {
    super(props);
    const {nodes, width, height, trigger} = props;
    this.trigger = trigger

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
      fill: "#fbce0f"
    };
  }

  isAtPosition() {
    let spot = document.querySelector(".third").getBoundingClientRect();
    return (
      spot.top < 100
    )
  }

  componentDidMount(){
    window.addEventListener('scroll', () => {
      this.showPicture()
    });
  }

  showPicture() {
    if (this.isAtPosition()) {
      this.setState({fill: "#272b4d"})
    } else {
      this.setState({fill: "#fbce0f"})
    }
  }

  render() {
    const {nodes, links, width, height, fill} = this.state

    this.graph = {
      nodes,
      links
    };

    return(
      <svg width={width} height={height}>
        <rect width={width} height={height} rx={14} fill={fill} />
        <Graph graph={this.graph} />
      </svg>
    )

  }
}

export default TransportGraph;