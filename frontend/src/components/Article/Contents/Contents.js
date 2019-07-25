import Latex from "react-latex"
import React from "react"
import BEM from "../../../helpers/BEM"
import "./Contents.scss"

const b = BEM("Contents")

const Contents = ({ contentsModifier }) => (
  <div className={b([contentsModifier])}>
    <a href="#preface">
      <h2 className={b("header")}>Зміст</h2>
    </a>
    <ul className={b("list")}>
      <a className={b("chapter")} href="#problem-description-and-historical-precedent">
        Опис проблеми та Історичний прецедент
      </a>
      <a className={b("chapter")} href="#tale-of-two-cities">
        Історія двох міст
      </a>
      <a className={b("subchapter")} href="#bristol">
        Брістоль
      </a>
      <a className={b("subchapter")} href="#lviv">
        Львів
      </a>
      <a className={b("chapter")} href="#public-transport-as-a-complex-network">
        Громадський транспорт як складна мережа
      </a>
      <a className={b("chapter")} href="#data-processing">
        Обробка даних
      </a>
      <a className={b("chapter")} href="#network-topological-characteristics">
        Топологічні характеристики мереж
      </a>
      <a className={b("subchapter")} href="#characteristics-in-l-space">
        Характеристики в <Latex>$\mathbb L$-space</Latex>
      </a>
      <a className={b("subchapter")} href="#characteristics-in-p-space">
        Характеристики в <Latex>$\mathbb P$</Latex>-space
      </a>
      <a className={b("subchapter")} href="#characteristics-in-c-space">
        Характеристики в <Latex>$\mathbb C$</Latex>-space
      </a>
      <a className={b("chapter")} href="#network-stability-to-atacks">
        Стійкість мереж до атак
      </a>
      <a className={b("subchapter")} href="#attacks-in-l-space">
        Атаки в <Latex>$\mathbb L$</Latex>-space
      </a>
      <a className={b("subchapter")} href="#attacks-in-p-space">
        Атаки в <Latex>$\mathbb P$</Latex>-space
      </a>
      <a className={b("subchapter")} href="#attacks-in-c-space">
        Атаки в <Latex>$\mathbb C$</Latex>-space
      </a>
      <a className={b("chapter")} href="#conclusions">
        Висновки
      </a>
      <a className={b("chapter")} href="#whats-next">
        Що далі?
      </a>
    </ul>
  </div>
)

export default Contents
