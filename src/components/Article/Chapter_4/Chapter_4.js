import React from "react"
import BEM from "../../../helpers/BEM.js"
import CitiesInfoBlock from "../../CitiesInfoBlock"
import Subchapter1 from "./Subchapter_4_1"
import "../Article.scss"

const b = BEM("Article")

const Chapter_4 = () => (
  <section>
    <Subchapter1 />
    <div className={b("illustration", ["wide"])} style={{ height: "90vh" }}>
      <CitiesInfoBlock />
    </div>
  </section>
)

export default Chapter_4
