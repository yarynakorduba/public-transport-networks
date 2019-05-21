import React from "react"
import BEM from "../../../helpers/BEM.js"
import Subchapter1 from "./Subchapter_2_1"
import Subchapter2 from "./Subchapter_2_2"
import "../Article.scss"

const b = BEM("Article")

const Chapter_2 = () => (
  <section id={"chapter2"}>
    <h1 className={b("header")}>Історія двох міст</h1>
    <em>
      Нашою метою було дослідити транспортну мережу Львова. Коректність результатів важливо перевірити на вже готових
      дослідженнях для схожого за розміром міста. Так ми обрали транспортну систему Брістоля. Свій аналіз Брістоля ми
      змогли порівняти із результатами з попередніх досліджень.
    </em>
    <Subchapter1 />
    <Subchapter2 />
  </section>
)

export default Chapter_2
