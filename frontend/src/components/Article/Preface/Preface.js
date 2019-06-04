import React from "react"
import Contents from "../Contents/Contents"

import BEM from "../../../helpers/BEM.js"
import "./Preface.scss"

const b = BEM("Preface")

const Preface = () => (
  <div className={b()}>
    <div className={b("container")}>
      <h5 className={b("title", ["aligned-left-top"])}>Науковий підхід у проектуванні громадського транспорту</h5>
      <p className={b("content", ["aligned-left-bottom"])}>
        Ця стаття описує дослідження систем громадського транспорту Брістоля і Львова. У рамках дослідження ми вивчаємо
        структуру транспортних систем, визначаємо їх основні характеристики і перевіряємо стійкість до атак. Для цього
        розглядаємо громадський транспорт як мережу зв’язків. Ці зв’язки ми вивчаємо за допомогою теорії складних мереж.
      </p>
    </div>
    <Contents contentsModifier={"aligned-right-top"} />
  </div>
)
export default Preface