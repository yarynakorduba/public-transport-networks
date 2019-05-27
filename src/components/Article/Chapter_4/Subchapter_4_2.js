import React from "react"
import Latex from "react-latex"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"

const b = BEM("Article")

const Subchapter_4_2 = () => (
  <section>
    <p className={b("paragraph")}>
      Наша мета - дослідити структуру транспортної мережі. Дізнатися, наскільки вона зв’язна і стійка, скільки є великих
      зупинок, які зупинки найбільш важливі для роботи системи. Ми не вивчатимемо руху транспорту чи пасажиропотоків.
      Тому транспортні дані можна спростити (кроки відображені на ілюстрації):
    </p>
    <ol>
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
    <div className={b("illustration", ["wide"])} style={{ height: "100vh" }}>
      <figure>
        <img alt={"Network simplification steps"} src={"./img/chapter3/networkSimplificationSteps.png"} />
        <figcaption className={b("image-caption")}>Кроки для спрощення транспортної системи</figcaption>
      </figure>
    </div>
    <p className={b("paragraph")}>
      Зі спрощених транспортних даних побудуємо <Latex>$\mathbb L$-space</Latex>, <Latex>$\mathbb P$-space</Latex> i{" "}
      <Latex>$\mathbb C$-space</Latex>.
    </p>
    Попередні дослідження Брістоля в <Latex>$\mathbb L$-space</Latex>{" "}
    <a href={"https://arxiv.org/pdf/1705.07266.pdf"}>"Public transportation in UK viewed as a complex network"</a>
  </section>
)

export default Subchapter_4_2
