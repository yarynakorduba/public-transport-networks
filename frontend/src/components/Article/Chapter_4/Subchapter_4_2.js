import React from "react"
import Latex from "react-latex"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"

const b = BEM("Article")

const Subchapter_4_2 = () => (
  <section>
    <div className={b("illustration", ["wide"])} style={{ height: "100vh" }}>
      <figure>
        <img alt={"Network simplification steps"} src={"./img/chapter3/networkSimplificationSteps.svg"} />
        <figcaption className={b("image-caption")}>Кроки для спрощення транспортної системи</figcaption>
      </figure>
    </div>
  </section>
)

export default Subchapter_4_2
