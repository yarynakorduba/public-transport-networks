import React from "react"
import Latex from "react-latex"
import BEM from "../../helpers/BEM.js"
import "./Article.scss"

const b = BEM("Article")

const Chapter_7 = () => (
  <section id={"chapter7"}>
    <h1 className={b("header")}>
      Топологічні характеристики в <Latex>$\mathbb C$</Latex>-space
    </h1>
    <p className={b("paragraph")}>
      Як ми вже знаємо, <Latex>$\mathbb C$</Latex>-space - це простір маршрутів. Тут легко відслідковувати зв’язки між
      ними.
    </p>
    <p className={b("paragraph")}>
      <b>
        <b>
          Середній ступінь вузла <Latex>$\langle k\rangle$</Latex>
        </b>
      </b>{" "}
      в <Latex>$\mathbb C$</Latex>-space показує середню кількість маршрутів, із якими з’єднаний маршрут мережі.{" "}
      <Latex>{"$\\langle k \\rangle_{BRS} = 34$"}</Latex> маршрутів, а{" "}
      <Latex>{"$\\langle k \\rangle_{LWO} = 39$"}</Latex> маршрутів.
    </p>
    <p className={b("paragraph")}>
      <b>
        Середній найкоротший шлях <Latex>l</Latex>
      </b>{" "}
      в <Latex>$\mathbb C$</Latex>-space відображає середню кількість пересадок, яка відділяє один маршрут від іншого.
      <Latex>{"$\\langle l \\rangle_{BRS}=1.9$"}</Latex>, а <Latex>{"$\\langle l \\rangle_{LWO}=1.5$"}</Latex>.
    </p>
    <p className={b("paragraph")}>
      <b>
        Діаметр <Latex>$D$</Latex>
      </b>{" "}
      в <Latex>$\mathbb C$</Latex>-space вказує на найбільшу кількість пересадок між двома маршрутами мережі.{" "}
      <Latex>{"$D_{BRS} = 4$"}</Latex>, а <Latex>{"$D_{LWO} = 3$"}</Latex>.
    </p>
    <p className={b("paragraph")}>
      Ефективність найкоротшого шляху <Latex>{"$l_{\\beta}$"}</Latex>в <Latex>$\mathbb C$</Latex>-space краща у Львова:{" "}
      <Latex>{"$l_{\\beta BRS} = 1.2$"}</Latex>, а <Latex>{"$l_{\\beta LWO} = 1.13$"}</Latex>.
    </p>
    <p className={b("paragraph")}>
      <b>
        Коефіцієнт кластерності <Latex>$C$</Latex>
      </b>{" "}
      в <Latex>$\mathbb C$</Latex>-space показує, наскільки зв’язані між собою маршрути.{" "}
      <Latex>{"$ C_{BRS} = 0.6 $"}</Latex>, <Latex>{"$ C_{LWO} = 0.75 $"}</Latex>.
    </p>
    <p className={b("paragraph")}>
      <b>Асортативність r</b> в <Latex>$\mathbb C$</Latex>-space у львівській і брістольській мережах різна:{" "}
      <Latex>{"$r_{BRS} = 0.06$"}</Latex>, <Latex>{"$r_{LWO} = -0.05$"}</Latex>. Тобто у львівській мережі
      вузли-маршрути із низьким ступенем (із невеликою кількістю ребер) найчастіше мають зв’язки із маршрутами високого
      ступеня. У брістольській мережі навпаки, маршрути із високим ступенем частіше формують зв’язки із маршрутами
      низького ступеня.
    </p>
  </section>
)

export default Chapter_7
