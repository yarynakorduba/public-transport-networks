import React, {Component} from "react";
import { Graph, Nodes, Links } from '@vx/network';

class NetworkNode extends Component {

  render() {
    return(
      <circle r={10} fill={"#2a21fb"} />
    );
  }
}

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
      spot.top < 0
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
        <rect width={width} height={height} rx={10} fill={fill} />
        <Graph graph={this.graph} nodeComponent={NetworkNode}/>
      </svg>
    )

  }
}

export default TransportGraph;