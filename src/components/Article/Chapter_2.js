import React from "react"
import Latex from "react-latex"

import BEM from "../../helpers/BEM.js"
import "./Article.scss"

import RadialForceGraph from "../ForceGraph/RadialForceGraph"
import ForceGraph from "../ForceGraph"

const b = BEM("Article")

const Chapter_2 = () => (
  <section>
    <h1 className={b("header")}>Науковий підхід</h1>
    <div className={b("illustration")}><RadialForceGraph/></div>
    <div className={b("illustration" )}><ForceGraph/></div>
    <p className={b("paragraph", ["first"])}>
      У науковому світі з'явилося багато підходів для визначення ефективності та стійкості різних систем. Дане
      дослідження базується на побудові ненапрямленого графа маршрутів у трьох різних просторах: \
      <Latex>$L\text-space$</Latex>, <Latex>$P\text-space$</Latex> i <Latex>$C\text-space$</Latex>, кожен із яких
      відображає різні аспекти роботи транспортної системи.
      <Latex>$L\text-space$</Latex>
      - найпростіший для нашого розуміння вимір, адже він відтворює "топографію" мережі. У цьому відображенні зупинки -
      це вузли графа, і два вузли пов'язані між собою ребром лише, якщо вони суміжні на маршруті. Маршрути пов'язані між
      собою через спільні зупинки. (Оскільки зазвичай зупинки прямого та зворотного маршрутів знаходяться через дорогу
      одна від одної, останніми можна знехтувати. Для побудови графа у цьому дослідженні використовуються лише прямі
      маршрути)
      <img src="img/exampleLSpace.svg" className={b("image", ["small"])} alt="example LSpace graph" />
      <Latex children={"$P\\text-space$"} />
      відображає кількість пересадок, яку потрібно зробити, щоби здійснити поїздку між будь-якими двома зупинками. У
      цьому просторі всі зупинки-вузли, що належать до одного маршруту, з'єднані одна з одною прямим ребром, адже між
      кожними двома зупинками одного маршруту можна проїхати, не змінюючи транспорту.{" "}
      <img src="img/examplePSpace.svg" className={b("image", ["small"])} alt="Example PSpace" />У{" "}
      <Latex>$C\text-space$</Latex>
      інформація більш узагальнена. Цей простір відображає зв'язки не між зупинками, а між маршрутами для того, щоби
      прослідкувати, скільки пересадок потрібно здійснити, щоби дістатися від зупинки одного маршруту до зупинки іншого
      маршруту.
      <img src="img/exampleCSpace.svg" alt="Example CSpace" className={b("image", ["small"])} />
    </p>

  </section>
)

export default Chapter_2