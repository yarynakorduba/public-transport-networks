import React from "react"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"
import HeatMap from "../../HeatMap/HeatMap"
import CitiesInfoBlock from "../../CitiesInfoBlock/CitiesInfoBlock"
import Latex from "react-latex"

const b = BEM("Article")

const Subchapter_4_1 = () => (
  <section>
    <h1 className={b("header")}>Обробка даних</h1>
    <div className={b("illustration", ["sticky"])} style={{ height: "160vh", top: "2rem" }}>
      <div style={{ height: "80vh" }}>
        <HeatMap city={"lviv"} />
      </div>
      <div style={{ height: "80vh" }}>
        <HeatMap city={"bristol"} />
      </div>
    </div>
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
    <p>Так ми зможемо порівняти дві міські транспортні мережі між собою:</p>
    <div style={{ height: "90vh" }}>
      <CitiesInfoBlock />
    </div>
    <p className={b("paragraph")}>
      Наша мета - дослідити структуру транспортної мережі. Дізнатися, наскільки вона зв’язна і стійка, скільки є великих
      зупинок, які зупинки найбільш важливі для роботи системи. Ми не вивчатимемо руху транспорту чи пасажиропотоків.
      Тому транспортні дані можна спростити (кроки відображені на ілюстрації):
    </p>
    <ol className={"list"}>
      <li>
        З’єднаємо зупинки, які знаходяться в радіусі <Latex>$R=40$м</Latex> одна від одної. На перехід між ними пасажир
        витрачає менше одної хвилини. Для цього використаємо алгоритм кластеризації{" "}
        <a href={"https://uk.wikipedia.org/wiki/DBSCAN"}>DBSCAN</a>. (*Кластеризація зупинок використовується лише в{" "}
        <Latex>$\mathbb L$-space</Latex> - "просторі зупинок". <Latex>$\mathbb P$-</Latex> і{" "}
        <Latex>$\mathbb C$-space</Latex> важливі для аналізу кількості пересадок і зв'язків між маршрутами. Тому в цих
        відображеннях кластеризацію не застосовуємо.)
      </li>
      <li>Відкинемо позначення напрямків маршрутів</li>
      <li>Якщо між двома зупинками є декілька зв’язків, залишаємо лише один</li>
    </ol>
    <p className={b("paragraph")}>
      Зі спрощених транспортних даних побудуємо <Latex>$\mathbb L$-space</Latex>, <Latex>$\mathbb P$-space</Latex> i{" "}
      <Latex>$\mathbb C$-space</Latex>.
    </p>
  </section>
)

export default Subchapter_4_1
