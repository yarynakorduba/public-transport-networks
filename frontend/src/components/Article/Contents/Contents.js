import Latex from "react-latex"
import React from "react"
import BEM from "../../../helpers/BEM"
import "./Contents.scss"

const b = BEM("Contents")

const Contents = ({contentsModifier}) => (
  <div className={b([contentsModifier])}>
    <h2 className={b("header")}>Зміст</h2>
    <ul className={b("list")}>
      <a className={b("chapter")} href="#chapter1">
        Опис проблеми та Історичний прецедент
      </a>
      <a className={b("chapter")} href="#chapter2">
        Історія двох міст
      </a>
      <a className={b("subchapter")} href="#chapter2">
        Брістоль
      </a>
      <a className={b("subchapter")} href="#chapter2">
        Львів
      </a>
      <a className={b("chapter")} href="#chapter3">
        Громадський транспорт як складна мережа
      </a>
      <a className={b("chapter")} href="#chapter4">
        Обробка даних
      </a>
      <a className={b("chapter")} href="#chapter5">
        Топологічні характеристики мереж
      </a>
      <a className={b("subchapter")} href="#chapter5">
        Характеристики в <Latex>$\mathbb L$-space</Latex>
      </a>
      <a className={b("subchapter")} href="#chapter6">
        Характеристики в <Latex>$\mathbb P$</Latex>-space
      </a>
      <a className={b("subchapter")} href="#chapter7">
        Характеристики в <Latex>$\mathbb C$</Latex>-space
      </a>
      <a className={b("chapter")} href="#chapter8">
        Стійкість мереж до атак
      </a>
      <a className={b("subchapter")} href="#chapter8">
        Атаки в <Latex>$\mathbb L$</Latex>-space
      </a>
      <a className={b("subchapter")} href="#chapter8">
        Атаки в <Latex>$\mathbb P$</Latex>-space
      </a>
      <a className={b("subchapter")} href="#chapter8">
        Атаки в <Latex>$\mathbb C$</Latex>-space
      </a>
      <a className={b("chapter")} href="#chapter9">
        Топологічні характеристики в P space
      </a>
      <a className={b("chapter")} href="#chapter10">
        Що далі?
      </a>
    </ul>
  </div>
)

export default Contents
