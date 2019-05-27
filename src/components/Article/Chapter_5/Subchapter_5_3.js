import React from "react"
import Latex from "react-latex"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"

const b = BEM("Article")

const Subchapter_5_3 = () => (
  <section id={"chapter7"}>
    <h1 className={b("header")}>
      Характеристики в <Latex>$\mathbb C$</Latex>-space
    </h1>
    <p className={b("paragraph")}>
      <Latex>$\mathbb C$</Latex>-space - це "простір маршрутів". Тут легко відслідковувати зв’язки між ними.
    </p>
    <p className={b("paragraph")}>
      <b>
        <b>
          Середній ступінь вузла <Latex>{"$k^{avg}$"}</Latex>
        </b>
      </b>{" "}
      в <Latex>$\mathbb C$</Latex>-space показує середню кількість маршрутів, із якими з’єднаний маршрут мережі.{" "}
      <Latex>{"$k_{BRS}^{avg} = 34$"}</Latex> маршрутів, а <Latex>{"$k_{LWO}^{avg} = 39$"}</Latex> маршрутів.
    </p>
    <p className={b("paragraph")}>
      <b>
        Середній найкоротший шлях <Latex>{"$l^{avg}$"}</Latex>
      </b>
      , як і в <Latex>$\mathbb P$</Latex>-space вказує на середню кількість пересадок <Latex>{"$T^{avg}$"}</Latex>:
      <Latex displayMode={true}>{"$T^{avg} = l^{avg} - 1$"}</Latex>
      Тільки замість пересадок між зупинками в <Latex>$\mathbb C$</Latex>-space йдеться про пересадки між маршрутами.
      <Latex>{"$l_{BRS}^{avg}=1.9$"}</Latex>, а <Latex>{"$l_{LWO}^{avg}=1.5$"}</Latex>.
    </p>
    <p className={b("paragraph")}>
      <b>
        Діаметр <Latex>$D$</Latex>
      </b>
      в <Latex>$\mathbb C$</Latex>-space вказує на найбільшу необхідну кількість пересадок між двома маршрутами мережі:
      <Latex displayMode={true}>{"$T^{max} = D - 1$"}</Latex>.<Latex>{"$D_{BRS} = 4$"}</Latex>, а{" "}
      <Latex>{"$D_{LWO} = 3$"}</Latex>. Тому максимальна кількість пересадок у Брістолі
      <Latex>{"$T_{BRS}^{max} = 3$"}</Latex>, а у Львові: <Latex>{"$T_{LWO}^{max} = 2$"}</Latex>.
    </p>
    <p className={b("paragraph")}>
      Ефективність найкоротшого шляху <Latex>{"$l_{\\beta}$"}</Latex>в <Latex>$\mathbb C$</Latex>-space краща у
      львівської мережі: <Latex>{"$l_{\\beta BRS} = 1.2$"}</Latex>, а <Latex>{"$l_{\\beta LWO} = 1.13$"}</Latex>.
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
      <Latex>{"$r_{BRS} = 0.06$"}</Latex>, <Latex>{"$r_{LWO} = -0.05$"}</Latex>. Тобто у брістольській мережі зв'язки
      найчастіше формуються між вузлами подібного ступеня. У львівській мережі навпаки, вузли-маршрути із високим
      ступенем частіше формують зв’язки із вузлами низького ступеня.
    </p>
  </section>
)

export default Subchapter_5_3
