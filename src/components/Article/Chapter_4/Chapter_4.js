import React from "react"
import BEM from "../../../helpers/BEM.js"
import CitiesInfoBlock from "../../CitiesInfoBlock"
import Subchapter1 from "./Subchapter_4_1"
import Subchapter2 from "./Subchapter_4_2"
import "../Article.scss"

const b = BEM("Article")

const Chapter_4 = () => (
  <section id={"chapter4"}>
    <Subchapter1 />
    <div className={b("illustration", ["wide"])} style={{ height: "90vh" }}>
      <CitiesInfoBlock />
    </div>
    <Subchapter2 />
  </section>
)

export default Chapter_4
