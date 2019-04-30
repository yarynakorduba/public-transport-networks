import React from "react"
import Latex from "react-latex"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"
const b = BEM("Article")

const Subchapter_8_3 = () => (
  <section>
    <h1 className={b("header")}>
      Атаки в <Latex>$\mathbb P$</Latex>-space
    </h1>
    <p className={b("paragraph")}>
      Ми вже знаємо, що в <Latex>{"$\\mathbb P$"}</Latex>-space маршрути - це повні підграфи мережі. Всі вузли одного
      маршруту мають між собою ребра. Через велику кількість ребер мережа в <Latex>{"$\\mathbb P$"}</Latex>-space є
      стійкішою до атак, аніж в <Latex>{"$\\mathbb L$"}</Latex>-space. Це видно і на симуляціях. В{" "}
      <Latex>{"$\\mathbb P$"}</Latex>-space найменш небезпечними є випадкові атаки. Вони руйнують мережі лінійно.
      Найшвидшими виявилися атаки за центральністю посередництва із пересортуванням.
    </p>
    <figure>
      <img
        className={b("image", ["small", "inline"])}
        alt={"Bristol P-space Simulations"}
        src={"./img/chapter8/bristolPSpaceSimulations.png"}
      />
      <figcaption className={b("image-caption")}>
        Симуляції для Брістоля в <Latex>$\mathbb P$</Latex>-space
      </figcaption>
    </figure>
    <figure>
      <img
        className={b("image", ["small", "inline"])}
        alt={"Lviv P-space Simulations"}
        src={"./img/chapter8/lvivPSpaceSimulations.png"}
      />
      <figcaption className={b("image-caption")}>
        Симуляції для Львова в <Latex>$\mathbb P$</Latex>-space
      </figcaption>
    </figure>
  </section>
)

export default Subchapter_8_3
