import React from "react"
import Latex from "react-latex"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"
const b = BEM("Article")

const Subchapter_8_4 = () => (
  <section>
    <h1 className={b("header")}>
      Атаки в <Latex>$ \mathbb C$</Latex>-space
    </h1>
    <p className={b("paragraph")}>
      У <Latex>$\mathbb C$</Latex>-space мережі також сильно зв’язані, адже міські маршрути часто перетинаються між
      собою. Тому симуляції в<Latex>$ \mathbb C $</Latex>-space нагадують атаки в <Latex>$ \mathbb P$</Latex>-space. В
      обох містах в <Latex>$ \mathbb C$</Latex>-space найповільнішими є випадкові атаки, а найшвидші - атаки за
      центральністю посередництва із пересортуванням:
    </p>
    <figure>
      <img
        className={b("image")}
        alt={"Bristol C-space Simulations"}
        src={"./img/chapter8/bristolCSpaceSimulations.png"}
      />
      <figcaption className={b("image-caption")}>
        Симуляції для Брістоля в <Latex>$\mathbb C$</Latex>-space
      </figcaption>
    </figure>
    <figure>
      <img className={b("image")} alt={"Lviv C-space Simulations"} src={"./img/chapter8/lvivCSpaceSimulations.png"} />
      <figcaption className={b("image-caption")}>
        Симуляції для Львова в <Latex>$\mathbb C$</Latex>-space
      </figcaption>
    </figure>
  </section>
)

export default Subchapter_8_4
