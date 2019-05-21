import React from "react"
import BEM from "../../helpers/BEM.js"
import "./Article.scss"
import Latex from "react-latex"

const b = BEM("Article")

const Chapter_3 = () => (
  <section id={"chapter3"}>
    <h1 className={b("header")}>Громадський транспорт як складна мережа</h1>
    <p className={b("paragraph")}>
      Один із методів дослідження транспортних систем -{" "}
      <a href={"https://en.wikipedia.org/wiki/Complex_network"}>теорія складних (комплексних) мереж</a>. У рамках цієї
      теорії транспортну систему зображають як набір вершин (вузлів) і зв’язків між ними (ребер). Вершини та їхні
      зв’язки формують мережу, іншими словами граф. Його властивості ми і будемо досліджувати.
    </p>
    <p className={b("paragraph")}>
      Наша початкова мета - дослідити структуру транспортної мережі. Дізнатися, наскільки вона зв’язна і стійка, скільки
      є великих зупинок, які зупинки найбільш важливі для роботи системи. Спочатку ми не вивчатимемо руху транспорту чи
      пасажиропотік. Тому транспортну схему можна спростити (кроки відображені на ілюстрації):
    </p>
    <ol>
      <li>Заберемо позначення напрямків маршрутів</li>
      <li>
        З’єднаємо зупинки, які знаходяться в радіусі R=40м одна від одної. На перехід між ними пасажир витрачає менше
        одної хвилини. (Ми з’єднуємо зупинки за геокоординатами алгоритмом кластеризації{" "}
        <a href={"https://uk.wikipedia.org/wiki/DBSCAN"}>DBSCAN</a>)
        <img className={b("image")} src={"./img/chapter3/stopsClustering.png"} alt={"Stops clustering"} />
      </li>
      <li>Якщо між двома зупинками є декілька зв’язків, залишаємо лише один</li>
    </ol>
    <figure>
      <img
        className={b("image")}
        alt={"Network simplification steps"}
        src={"./img/chapter3/networkSimplificationSteps.png"}
      />
      <figcaption className={b("image-caption")}>Кроки для спрощення транспортної системи</figcaption>
    </figure>
    <p className={b("paragraph")}>
      Існують різні варіанти відображення транспортної системи на графі. Ми будуємо граф у трьох відображеннях:{" "}
      <Latex>$\mathbb L$-space</Latex>, , <Latex>$\mathbb P$-space</Latex> i <Latex>$\mathbb C$-space</Latex>.
    </p>
    <p className={b("paragraph")}>
      <b>
        <Latex>$\mathbb L$-space</Latex>
      </b>
      . Позначмо кожну зупинку громадського транспорту, як вузол. А ребра слугуватимуть, як позначення маршрутів. Ось це
      і називатиметься <Latex>$\mathbb L$-space</Latex>. Як приклад, розглянемо три львівські маршрути: трамваї №3 і №6
      і №8:
    </p>
    <img className={b("image")} alt={"Transport schema"} src={"./img/chapter3/exampleTransportSchema.png"} />
    <p className={b("paragraph")}>
      Їх зображення в <Latex>$\mathbb L$</Latex>-space виглядатиме так:
    </p>
    <img className={b("image")} alt={"L-space"} src={"./img/chapter3/exampleLSpace.png"} />
    <p className={b("paragraph")}>
      <b>
        <Latex>$\mathbb P$-space</Latex>
      </b>
      . Побудуємо граф, подібний до попереднього (графа в <Latex>$\mathbb L$-space</Latex>). Однак зараз вузли (зупинки)
      будуть з’єднані, якщо вони належать до одного маршруту. Математичною мовою маршрути - це{" "}
      <a href={"https://uk.wikipedia.org/wiki/%D0%9F%D0%BE%D0%B2%D0%BD%D0%B8%D0%B9_%D0%B3%D1%80%D0%B0%D1%84"}>
        повні підграфи
      </a>{" "}
      транспортної системи
    </p>
    <img className={b("image")} alt={"P-space"} src={"./img/chapter3/examplePSpace.png"} />
    <p className={b("paragraph")}>
      <b>
        <Latex>$\mathbb C$-space</Latex>
      </b>
      . Узагальнимо вигляд транспортної системи і позначимо вузлами маршрути. Ті маршрути, що перетинаються, з’єднаємо
      ребром. В <Latex>$\mathbb C$</Latex>-space легко побачити кількість пересадок між двома маршрутами. Трамваї №5 та
      №7 мають спільні зупинки (Театр Ляльок, вул. Підвальна). Однак трамвай №6 повністю ізольований від них, а отже наш
      <Latex>$\mathbb C$-space</Latex> виглядатиме так:
    </p>
    <img className={b("image")} alt={"C-space"} src={"./img/chapter3/exampleCSpace.png"} />
  </section>
)

export default Chapter_3
