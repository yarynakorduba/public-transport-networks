import React from "react"
import BEM from "../../../helpers/BEM.js"
import Subchapter1 from "./Subchapter_5_1"
import Subchapter2 from "./Subchapter_5_2"
import Subchapter3 from "./Subchapter_5_3"
import "../Article.scss"
import GraphVisualization from "../../GraphVisualization/GraphVisualization"

const b = BEM("Article")

const Chapter_5 = () => (
  <section id={"network-topological-characteristics"}>
    <h1 className={b("header")}>Топологічні характеристики мереж</h1>
    <Subchapter1 />
    <div className={b("illustration", ["wide"])} style={{ height: "100vh" }}>
      <GraphVisualization space={"l"} />
    </div>
    <Subchapter2 />
    <Subchapter3 />
  </section>
)

export default Chapter_5
