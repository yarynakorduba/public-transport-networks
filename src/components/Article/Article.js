import React from "react"

import Chapter1 from "./Chapter_1"
import Chapter2 from "./Chapter_2/Chapter_2"
import Chapter3 from "./Chapter_3"
import Chapter4 from "./Chapter_4"
import Chapter5 from "./Chapter_5"
import Chapter6 from "./Chapter_6"
import Chapter7 from "./Chapter_7"
import Chapter8 from "./Chapter_8/Chapter_8"
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
      <em>
        Ця стаття описує дослідження систем громадського транспорту Брістоля і Львова. У рамках дослідження ми
        визначаємо основні характеристики транспортних систем і перевіряємо їх стійкість до атак. Для цього розглядаємо
        громадський транспорт як мережу зв’язків. Ці зв’язки ми вивчаємо за допомогою теорії складних мереж.
      </em>
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
      <Chapter6 />
      <Chapter7 />
      <Chapter8 />
      <Chapter9 />
      <Chapter10 />
    </div>
  </TriggerContext>
)
export default Article
