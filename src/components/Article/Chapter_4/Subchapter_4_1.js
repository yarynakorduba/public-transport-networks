import React from "react"
import Latex from "react-latex"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"
import HeatMap from "../../HeatMap/HeatMap"

const b = BEM("Article")

const Subchapter_4_1 = () => (
  <section>
    <div className={b("illustration", ["sticky"])} style={{ height: "180vh" }}>
      <div style={{ height: "90vh" }}>
        <HeatMap city={"lviv"} />
      </div>
      <div style={{ height: "90vh" }}>
        <HeatMap city={"bristol"} />
      </div>
    </div>
    <h1 className={b("header")}>Вихідні дані</h1>
    <p className={b("paragraph")}>
      Для дослідження ми обрали дві системи громадського транспорту: львівську і брістольську. Датасети для Брістоля та
      його околиць за 2011 рік взято із{" "}
      <a href={"http://data.gov.uk/dataset/nptdr"}>National Transport Data Repository</a>. Дані для Львова за 2018 рік -
      із системи <a href={"http://ua-gis.com/"}>UA-Gis Track</a> і сервісу{" "}
      <a href={"http://lviv-transport.online/?fbclid=IwAR1uUvz7IDFgtc4TxBiByB4w7JqW-Ou45sGPCnopI8q1Acn1FP5LrfPp1dg"}>
        Lviv Transport Online
      </a>
      . Із даних ми відкинули зупинки, що знаходяться поза офіційними межами{" "}
      <a href={"https://www.openstreetmap.org/relation/2108752#map=11/49.8482/24.0099"}>Львова</a> і{" "}
      <a href={"https://www.openstreetmap.org/relation/57539#map=11/51.4326/-2.7287"}>Брістоля</a>.
    </p>
    <figure>
      <img src="./img/chapter4/lvivBoundaries.png" className={b("image")} alt={"Lviv Boundaries"} />
      <img src="./img/chapter4/bristolBoundaries.png" className={b("image")} alt={"Bristol Boundaries"} />
      <figcaption className={b("image-caption")}>Межі Львова та Брістоля</figcaption>
    </figure>
    <p className={b("paragraph")}>
      Попередні дослідження Брістоля в <Latex>$\mathbb L$-space</Latex>{" "}
      <a href={"https://arxiv.org/pdf/1705.07266.pdf"}>"Public transportation in UK viewed as a complex network"</a>
    </p>
  </section>
)

export default Subchapter_4_1
