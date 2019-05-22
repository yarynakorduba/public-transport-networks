import React from "react"
import { Link } from "react-scroll"
import Latex from "react-latex"

import Chapter1 from "./Chapter_1"
import Chapter2 from "./Chapter_2/Chapter_2"
import Chapter3 from "./Chapter_3"
import Chapter4 from "./Chapter_4/Chapter_4"
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
      <h2>Зміст</h2>
      <ul className={b("contents")}>
        <Link
          className={b("contents__link")}
          activeClass="active"
          to="chapter1"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
        >
          Опис проблеми та Історичний прецедент
        </Link>
        <Link
          className={b("contents__link")}
          activeClass="active"
          to="chapter2"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
        >
          Історія двох міст
        </Link>
        <Link
          className={b("contents__link")}
          activeClass="active"
          to="chapter3"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
        >
          Громадський транспорт як складна мережа
        </Link>
        <Link
          className={b("contents__link")}
          activeClass="active"
          to="chapter4"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
        >
          Вихідні дані
        </Link>
        <Link
          className={b("contents__link")}
          activeClass="active"
          to="chapter5"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
        >
          Топологічні характеристики в <Latex>$\mathbb L$-space</Latex>
        </Link>
        <Link
          className={b("contents__link")}
          activeClass="active"
          to="chapter6"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
        >
          Топологічні характеристики в <Latex>$\mathbb P$</Latex>-space
        </Link>
        <Link
          className={b("contents__link")}
          activeClass="active"
          to="chapter7"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
        >
          Топологічні характеристики в <Latex>$\mathbb C$</Latex>-space
        </Link>
        <Link
          className={b("contents__link")}
          activeClass="active"
          to="chapter8"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
        >
          Стійкість мереж до атак
        </Link>
        <Link
          className={b("contents__link")}
          activeClass="active"
          to="chapter9"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
        >
          Топологічні характеристики в P space
        </Link>
        <Link
          className={b("contents__link")}
          activeClass="active"
          to="chapter10"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
        >Що далі?</Link>
      </ul>
      <h1>Науковий підхід у проектуванні громадського транспорту</h1>
      <p className={b("description-block")}>
        Ця стаття описує дослідження систем громадського транспорту Брістоля і Львова. У рамках дослідження ми
        визначаємо основні характеристики транспортних систем і перевіряємо їх стійкість до атак. Для цього розглядаємо
        громадський транспорт як мережу зв’язків. Ці зв’язки ми вивчаємо за допомогою теорії складних мереж.
      </p>
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
