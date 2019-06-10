import React from "react"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"
import HeatMap from "../../HeatMap/HeatMap"

const b = BEM("Article")

const Subchapter_4_1 = () => (
  <section>
    <div className={b("illustration", ["sticky"])} style={{ height: "180vh" }}>
      <div style={{ height: "90vh", textAlign: "center" }}>
        <HeatMap city={"lviv"} />
      </div>
      <div style={{ height: "90vh", textAlign: "center" }}>
        <HeatMap city={"bristol"} />
      </div>
    </div>
    <h1 className={b("header")}>Обробка даних</h1>
    <p className={b("paragraph")}>
      Для дослідження ми обрали дві системи громадського транспорту: львівську і брістольську. Датасети для Брістоля та
      його околиць за 2011 рік взято із{" "}
      <a href={"http://data.gov.uk/dataset/nptdr"}>National Transport Data Repository</a>. Дані для Львова за 2018 рік -
      із системи <a href={"http://ua-gis.com/"}>UA-Gis Track</a> і сервісу{" "}
      <a href={"http://lviv-transport.online/?fbclid=IwAR1uUvz7IDFgtc4TxBiByB4w7JqW-Ou45sGPCnopI8q1Acn1FP5LrfPp1dg"}>
        Lviv Transport Online
      </a>
      .
    </p>
    <p className={b("paragraph")}>
      Для початку ми відкидаємо зупинки, що знаходяться поза офіційними межами{" "}
      <a href={"https://www.openstreetmap.org/relation/2108752#map=11/49.8482/24.0099"}>Львова</a> і{" "}
      <a href={"https://www.openstreetmap.org/relation/57539#map=11/51.4326/-2.7287"}>Брістоля</a>.
    </p>
    <figure>
      <img src="./img/chapter4/lvivBoundaries.png" className={b("image")} alt={"Lviv Boundaries"} />
      <img src="./img/chapter4/bristolBoundaries.png" className={b("image")} alt={"Bristol Boundaries"} />
      <figcaption className={b("image-caption")}>Межі Львова та Брістоля</figcaption>
    </figure>
    <p>Так ми зможемо порівняти дві міські транспортні мережі між собою:</p>
  </section>
)

export default Subchapter_4_1
