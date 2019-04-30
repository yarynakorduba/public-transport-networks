import React from "react"
import Latex from "react-latex"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"
const b = BEM("Article")

const Subchapter_8_2 = () => (
  <section>
    <h1 className={b("header")}>Атаки в L-space</h1>
    <p className={b("paragraph")}>
      В <Latex>$\mathbb L$</Latex>-space в обох міст найповільніше руйнують мережу випадкові атаки. Найефективнішими
      виявилися атаки за значенням центральності посередництва (із пересортуванням).
    </p>
    <figure>
      <img
        className={b("image")}
        alt={"Bristol L-space Simulations"}
        src={"./img/chapter8/bristolLSpaceSimulations.png"}
      />
      <figcaption className={b("image-caption")}>
        Симуляції для Брістоля в <Latex>$\mathbb L$</Latex>-space
      </figcaption>
    </figure>
    <figure>
      <img className={b("image")} alt={"Lviv L-space Simulations"} src={"./img/chapter8/lvivLSpaceSimulations.png"} />
      <figcaption className={b("image-caption")}>
        Симуляції для Львова в <Latex>$\mathbb L$</Latex>-space
      </figcaption>
    </figure>
  </section>
)

export default Subchapter_8_2
