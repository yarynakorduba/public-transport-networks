import React from "react"
import Latex from "react-latex"

import BEM from "../../helpers/BEM.js"
import "./Article.scss"

const b = BEM("Article")

const Chapter_6 = () => (
  <section id={"chapter6"}>
    <h1 className={b("header")}>
      Топологічні характеристики в <Latex>$\mathbb P$</Latex>-space
    </h1>
    <p className={b("paragraph")}>
      Ми вже знаємо, що в <Latex>$\mathbb P$</Latex>-space кожен із маршрутів - це повний підграф. Тому мережі в{" "}
      <Latex>$\mathbb P$</Latex>-space зазвичай сильно зв’язні. В <Latex>$\mathbb P$</Latex>-space легко визначити
      кількість пересадок на шляху, через це його називають “простором пересадок”.
    </p>{" "}
    <p className={b("paragraph")}>
      Середній ступінь вузла k в <Latex>$\mathbb P$</Latex>-space набагато вищий, ніж в <Latex>$\mathbb L$</Latex>
      -space. Він показує середню кількість зупинок, із якими зупинка мережі має спільний маршрут. Для Брістоля{" "}
      <Latex>{"$\\langle k\\rangle_{BRS} = 101$"}</Latex>, а у Львові <Latex>{"$\\langle k\\rangle_{LWO} = 91$"}</Latex>
    </p>
    <p className={b("paragraph")}>
      Найкоротший шлях <Latex>$l$</Latex> в <Latex>$\mathbb P$</Latex>-space вказує на кількість пересадок між двома
      зупинками. Для зупинок одного маршруту <Latex>$\langle l\rangle=1$</Latex>. Тому можна вважати, що кількість
      пересадок між зупинками a і b = <Latex>{"$l_{ab} - 1$"}</Latex>. Для Брістоля{" "}
      <Latex>{"$\\langle l\\rangle_{BRS} = 2.1$"}</Latex>, а для Львова середній найкоротший шлях{" "}
      <Latex>{"$\\langle l \\rangle_{LWO} = 2$"}</Latex>. Тому будь-які дві зупинки цих мереж в середньому розділяє одна
      пересадка.
    </p>
    <p className={b("paragraph")}>
      <b>
        Діаметр <Latex>$D$</Latex>
      </b>
      , тобто максимальний найкоротший шлях, показує найбільшу необхідну кількість пересадок у мережі. Найбільша
      кількість пересадок між зупинками = <Latex>$D - 1$</Latex>. <Latex>{"$D_{BRS} = D_{LWO} = 5$"}</Latex>. А отже
      максимальна кількість пересадок в обох містах - 4.
    </p>{" "}
    <p className={b("paragraph")}>
      Ефективність найкоротшого шляху <Latex>{"$l_{\\beta}$"}</Latex> порівнює <Latex>$\langle l\rangle$</Latex> наших
      мереж із <Latex>$\langle l\rangle$</Latex> випадкового графа. <Latex>{"$l_{\\beta BRS} = 1.2$"}</Latex>, а{" "}
      <Latex>{"$l_{\\beta LWO} = 1.21$"}</Latex>. За цим показником мережа Брістоля є трошки ефективнішою, за львівську.
    </p>
    <p className={b("paragraph")}>
      <b>
        Коефіцієнт кластерності <Latex>$C$</Latex>
      </b>{" "}
      показує, що львівська мережа в <Latex>$\mathbb P$</Latex>-space є більш зв’язною за брістольську:{" "}
      <Latex>{"$C_{avg BRS} = 0.62$"}</Latex>, а <Latex>{"$ C_{avg LWO} = 0.64 $"}</Latex>.
    </p>
    <p className={b("paragraph")}>
      Асортативність r в <Latex>$\mathbb P$</Latex>-space від’ємна в обох мережах: <Latex>{"$r_{BRS} = -0.03$"}</Latex>,
      а<Latex>{"$r_{LWO} = - 0.06$"}</Latex>. Тобто мережі в <Latex>$\mathbb P$</Latex>-space дисортативні.
    </p>
  </section>
)

export default Chapter_6
