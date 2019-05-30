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
      Для дослідження ми обрали транспортну мережу Львова. Її ще не аналізували у рамках теорії складних мереж.
      Транспортну систему Львова було важливо порівняти із мережею схожого за розміром міста. Так ми обрали для аналізу
      ще одне місто - Брістоль.
    </em>
    <Subchapter1 />
    <Subchapter2 />
  </section>
)

export default Chapter_2
