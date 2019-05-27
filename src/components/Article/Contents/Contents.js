import { Link } from "react-scroll"
import Latex from "react-latex"
import React from "react"
import BEM from "../../../helpers/BEM"
import "./Contents.scss"

const b = BEM("Contents")

const Contents = () => (
  <div className={b()}>
    <h2 className={b("header")}>Зміст</h2>
    <ul className={b("list")}>
      <Link
        className={b("chapter")}
        activeClass="active"
        to="chapter1"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Опис проблеми та Історичний прецедент
      </Link>
      <Link
        className={b("chapter")}
        activeClass="active"
        to="chapter2"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Історія двох міст
      </Link>
      <Link
        className={b("subchapter")}
        activeClass="active"
        to="chapter2"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Брістоль
      </Link>
      <Link
        className={b("subchapter")}
        activeClass="active"
        to="chapter2"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Львів
      </Link>
      <Link
        className={b("chapter")}
        activeClass="active"
        to="chapter3"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Громадський транспорт як складна мережа
      </Link>
      <Link
        className={b("chapter")}
        activeClass="active"
        to="chapter4"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Обробка даних
      </Link>
      <Link
        className={b("chapter")}
        activeClass="active"
        to="chapter5"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Топологічні характеристики мереж
      </Link>
      <Link
        className={b("subchapter")}
        activeClass="active"
        to="chapter5"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Характеристики в <Latex>$\mathbb L$-space</Latex>
      </Link>
      <Link
        className={b("subchapter")}
        activeClass="active"
        to="chapter6"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Характеристики в <Latex>$\mathbb P$</Latex>-space
      </Link>
      <Link
        className={b("subchapter")}
        activeClass="active"
        to="chapter7"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Характеристики в <Latex>$\mathbb C$</Latex>-space
      </Link>
      <Link
        className={b("chapter")}
        activeClass="active"
        to="chapter8"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Стійкість мереж до атак
      </Link>
      <Link
        className={b("subchapter")}
        activeClass="active"
        to="chapter8"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Атаки в <Latex>$\mathbb L$</Latex>-space
      </Link>
      <Link
        className={b("subchapter")}
        activeClass="active"
        to="chapter8"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Атаки в <Latex>$\mathbb P$</Latex>-space
      </Link>
      <Link
        className={b("subchapter")}
        activeClass="active"
        to="chapter8"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Атаки в <Latex>$\mathbb C$</Latex>-space
      </Link>
      <Link
        className={b("chapter")}
        activeClass="active"
        to="chapter9"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Топологічні характеристики в P space
      </Link>
      <Link
        className={b("chapter")}
        activeClass="active"
        to="chapter10"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        Що далі?
      </Link>
    </ul>
  </div>
)

export default Contents
