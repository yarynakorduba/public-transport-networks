import React from "react"
import Latex from "react-latex"

import BEM from "../../../helpers/BEM.js"
import "../Article.scss"

const b = BEM("Article")

const Subchapter_5_2 = () => (
  <section id={"characteristics-in-p-space"}>
    <h1 className={b("subheader")}>
      Характеристики в <Latex>$\mathbb P$</Latex>-space
    </h1>
    <div className={b("illustration", ["sticky", "ref"])}>
      Дослідження інших міст в <Latex>$\mathbb L$</Latex>- і <Latex>$\mathbb P$</Latex>-space: <br />
      <a href={"http://194.44.208.227/~hol/PDF/paris1.pdf"}>von Ferber et al. "Modeling Metropolis Public Transport"</a>
    </div>
    <p className={b("paragraph")}>
      Ми вже знаємо, що в <Latex>$\mathbb P$</Latex>-space кожен із маршрутів - це повний підграф. Тому мережі в{" "}
      <Latex>$\mathbb P$</Latex>-space зазвичай сильно зв’язні. В <Latex>$\mathbb P$</Latex>-space легко визначити
      кількість пересадок на шляху, через це його називають “простором пересадок”.
    </p>{" "}
    <p className={b("paragraph")}>
      Середній ступінь вузла k в <Latex>$\mathbb P$</Latex>-space набагато вищий, ніж в <Latex>$\mathbb L$</Latex>
      -space. Він показує середню кількість зупинок, із якими зупинка мережі має спільний маршрут. Для Брістоля{" "}
      <Latex>{"$ k_{BRS}^{avg} = 101$"}</Latex>, а у Львові <Latex>{"$k_{LWO}^{avg} = 91$"}</Latex>
    </p>
    <p className={b("paragraph")}>
      Зі значення <Latex>$l$</Latex> в <Latex>$\mathbb P$</Latex>-space можна знайти кількість пересадок{" "}
      <Latex>{"$T$"}</Latex> між двома зупинками. Для зупинок одного маршруту <Latex>{"$l^{avg}=1$"}</Latex>. Тому можна
      вважати, що кількість пересадок між зупинками a і b <Latex displayMode={true}>{"$T^{ab} = l^{ab} - 1$"}</Latex>. А
      тому середня кількість пересадок
      <Latex displayMode={true}>{"$T^{avg} = l^{avg} - 1$"}</Latex> Для Брістоля{" "}
      <Latex>{"$l_{BRS}^{avg} = 2.1$"}</Latex>, а для Львова середній найкоротший шлях{" "}
      <Latex>{"$ l_{LWO}^{avg} = 2$"}</Latex>. Тому будь-які дві зупинки цих мереж в середньому розділяє одна пересадка.
    </p>
    <p className={b("paragraph")}>
      <b>
        Діаметр <Latex>$D$</Latex>
      </b>
      (максимальний найкоротший шлях) в <Latex>$\mathbb P$</Latex>-space пов'язаний із найбільшою необхідною кількістю
      пересадок у мережі:
      <Latex displayMode={true}>{"$T^{max} = D - 1$"}</Latex>
      <Latex>{"$D_{BRS} = D_{LWO} = 5$"}</Latex>, тому максимальна кількість пересадок в обох містах -{" "}
      <Latex>{"$4$"}</Latex>.
    </p>{" "}
    <p className={b("paragraph")}>
      Ефективність найкоротшого шляху <Latex>{"$l_{\\beta}$"}</Latex> порівнює <Latex>{"$l^{avg}$"}</Latex> наших мереж
      із <Latex>{"$l^{avg}$"}</Latex> випадкового графа. <Latex>{"$l_{\\beta BRS} = 1.2$"}</Latex>, а{" "}
      <Latex>{"$l_{\\beta LWO} = 1.21$"}</Latex>. За цим показником мережа Брістоля є трошки ефективнішою, за львівську.
    </p>
    <p className={b("paragraph")}>
      <b>
        Коефіцієнт кластерності <Latex>$C$</Latex>
      </b>{" "}
      показує, що львівська мережа в <Latex>$\mathbb P$</Latex>-space є більш зв’язною за брістольську:{" "}
      <Latex>{"$C_{BRS}^{avg} = 0.62$"}</Latex>, а <Latex>{"$ C_{LWO}^{avg} = 0.64 $"}</Latex>.
    </p>
    <p className={b("paragraph")}>
      Асортативність r в <Latex>$\mathbb P$</Latex>-space від’ємна в обох мережах: <Latex>{"$r_{BRS} = -0.03$"}</Latex>,
      а<Latex>{"$r_{LWO} = - 0.06$"}</Latex>. Тобто зв'язки найчастіше існують між вузлами із різними ступенями.
    </p>
  </section>
)

export default Subchapter_5_2
