import React from "react"
import Contents from "./Contents"
import Chapter1 from "./Chapter_1"
import Chapter2 from "./Chapter_2"
import Chapter3 from "./Chapter_3"
import Chapter4 from "./Chapter_4"
import Chapter5 from "./Chapter_5"
import Chapter8 from "./Chapter_8"
import Chapter9 from "./Chapter_9"
import Chapter10 from "./Chapter_10"

import BEM from "../../helpers/BEM.js"
import "./Article.scss"
import { TriggerContext } from "../Trigger"

const b = BEM("Article")

const Article = () => (
  <TriggerContext>
    <div className={b()}>
      <h1>Науковий підхід у проектуванні громадського транспорту</h1>
      <p className={b("description-block")}>
        Ця стаття описує дослідження систем громадського транспорту Брістоля і Львова. У рамках дослідження ми вивчаємо
        структуру транспортних систем, визначаємо їх основні характеристики і перевіряємо стійкість до атак. Для цього
        розглядаємо громадський транспорт як мережу зв’язків. Ці зв’язки ми вивчаємо за допомогою теорії складних мереж.
      </p>
      <Contents />
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
      <Chapter8 />
      <Chapter9 />
      <Chapter10 />
    </div>
  </TriggerContext>
)
export default Article
